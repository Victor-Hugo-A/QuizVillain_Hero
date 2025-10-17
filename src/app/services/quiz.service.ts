import { Injectable, computed, signal } from '@angular/core';
import { Option, PlayConfig, QuizState, ResultType } from '../models/quiz.model';
import { QUESTIONS } from '../utils/constants';
import { SoundService } from './sound.service';

@Injectable({ providedIn: 'root' })
export class QuizService {
  // ---------- Config ----------
  private _config = signal<PlayConfig>({
    category: 'todas',
    difficulty: 'todas',
    perQuestionSeconds: 20
  } as PlayConfig);

  // ---------- Estado ----------
  private _state = signal<QuizState>({
    loading: false,
    started: false,
    finished: false,
    currentIndex: 0,
    total: 0,
    score: 0,
    moralScore: 0,
    speedMultiplier: 1,
    streak: 0,
    lives: 3,
    powerups: { freeze: 1, double: 1, skip: 1 },
    timeLeft: 20,
    answers: []
  });

  readonly config = computed(() => this._config());
  readonly state  = computed(() => this._state());

  readonly filtered = computed(() => {
    const c = this._config().category;
    const d = this._config().difficulty;
    return QUESTIONS.filter(q =>
      (c === 'todas' || q.category === c) &&
      (d === 'todas' || q.difficulty === d)
    );
  });

  readonly progress = computed(() => {
    const s = this._state();
    return s.total ? (s.currentIndex / s.total) * 100 : 0;
  });

  readonly currentQuestion = computed(() => {
    const s = this._state();
    return this.filtered()[s.currentIndex] ?? null;
  });

  private intervalId: any = null;

  constructor(private sound: SoundService) {}

  // ---------- Config ----------
  setConfig(patch: Partial<PlayConfig>) {
    this._config.update(c => ({ ...c, ...patch }));
  }

  // ---------- Lifecycle ----------
  start() {
    const total = this.filtered().length;
    this._state.set({
      loading: false,
      started: true,
      finished: false,
      currentIndex: 0,
      total,
      score: 0,
      moralScore: 0,
      speedMultiplier: 1,
      streak: 0,
      lives: 3,
      powerups: { freeze: 1, double: 1, skip: 1 },
      timeLeft: this._config().perQuestionSeconds,
      answers: []
    });
    this.startTimer();
  }

  reset() {
    this.clearTimer();
    this._state.update(s => ({
      ...s,
      loading: false,
      started: false,
      finished: false,
      currentIndex: 0,
      total: 0,
      score: 0,
      moralScore: 0,
      speedMultiplier: 1,
      streak: 0,
      lives: 3,
      powerups: { freeze: 1, double: 1, skip: 1 },
      timeLeft: this._config().perQuestionSeconds,
      answers: []
    }));
  }

  // ---------- Timer ----------
  private startTimer() {
    this.clearTimer();
    this._state.update(s => ({ ...s, timeLeft: this._config().perQuestionSeconds }));
    this.intervalId = setInterval(() => {
      const left = this._state().timeLeft - 1;
      this._state.update(s => ({ ...s, timeLeft: left }));
      this.sound.playTick();
      if (left <= 0) {
        this.clearTimer();
        this.handleTimeout();
      }
    }, 1000);
  }

  private clearTimer() {
    if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
  }

  // ---------- Power-ups ----------
  powerFreeze() {
    const s = this._state();
    if (s.powerups.freeze <= 0) return;
    this._state.update(st => ({ ...st, powerups: { ...st.powerups, freeze: st.powerups.freeze - 1 } }));
    this.clearTimer(); // pausa o tempo
    this.sound.playPower();
  }

  powerDouble() {
    const s = this._state();
    if (s.powerups.double <= 0) return;
    // marca como ativo para a próxima resposta
    this._state.update(st => ({ ...st, powerups: { ...st.powerups, double: -1 as -1 } }));
    this.sound.playPower();
  }

  powerSkip() {
    const s = this._state();
    if (s.powerups.skip <= 0) return;
    const q = this.currentQuestion(); if (!q) return;

    this._state.update(st => ({
      ...st,
      powerups: { ...st.powerups, skip: st.powerups.skip - 1 },
      answers: [...st.answers, { qid: q.id, picked: null, delta: 0, timeLeft: st.timeLeft, gained: 0 }],
      currentIndex: Math.min(st.currentIndex + 1, st.total),
      streak: 0
    }));

    if (this._state().currentIndex >= this._state().total) this.finish();
    else this.startTimer();

    // this.sound.playPower();
  }

  resumeTimer() {
    if (!this.intervalId) this.startTimer();
  }

  // ---------- Responder ----------
  answerById(optionId: string) {
    const q = this.currentQuestion(); if (!q) return;
    const opt = q.options.find(o => o.id === optionId)!;
    this.answer(opt);
  }

  answer(opt: Option) {
    const q = this.currentQuestion(); if (!q) return;

    const total = this._config().perQuestionSeconds;
    const left = this._state().timeLeft;

    // multiplicador por velocidade: 1.0 a 2.0
    const speedMult = +(1 + (left / total)).toFixed(2);

    // streak progressivo (para delta=+1)
    const nextStreak = opt.delta === 1 ? Math.min(5, this._state().streak + 1) : 0;
    const streakBonus = (opt.delta === 1) ? (1 + nextStreak * 0.1) : 1;

    // base por delta
    const base = opt.delta === 1 ? 100 : opt.delta === -1 ? -100 : 0;

    // double ativo?
    const isDouble = this._state().powerups.double === -1;
    const doubleFactor = isDouble ? 2 : 1;

    const gained = Math.round(base * speedMult * streakBonus * doubleFactor);
    const nextScore = this._state().score + gained;
    const nextMoral = this._state().moralScore + opt.delta;

    // // som
    // if (opt.delta === 1) this.sound.playCorrect();
    // if (opt.delta === -1) this.sound.playWrong();

    // consome DOUBLE
    const nextPower = {
      ...this._state().powerups,
      double: isDouble ? 0 : this._state().powerups.double
    };

    this._state.update(s => ({
      ...s,
      score: nextScore,
      moralScore: nextMoral,
      speedMultiplier: speedMult,
      streak: nextStreak,
      powerups: nextPower,
      answers: [...s.answers, { qid: q.id, picked: opt.id, delta: opt.delta, timeLeft: left, gained }],
      currentIndex: Math.min(s.currentIndex + 1, s.total)
    }));

    // próxima
    if (this._state().currentIndex >= this._state().total) {
      this.finish();
    } else {
      this.startTimer();
    }
  }

  // ---------- Timeout ----------
  private handleTimeout() {
    const q = this.currentQuestion(); if (!q) return;
    const penalty = -50;

    this._state.update(s => ({
      ...s,
      lives: Math.max(0, s.lives - 1),
      score: s.score + penalty,
      streak: 0,
      answers: [...s.answers, { qid: q.id, picked: null, delta: -1, timeLeft: 0, gained: penalty }],
      currentIndex: Math.min(s.currentIndex + 1, s.total)
    }));

    if (this._state().currentIndex >= this._state().total || this._state().lives <= 0) {
      this.finish();
    } else {
      this.startTimer();
    }
  }

  private computeResultThreshold(totalPlayed: number): number {
    // pelo menos 1, e metade arredondada pra cima
    return Math.max(1, Math.ceil(totalPlayed * 0.5));
  }

  getResultType(moral = this._state().moralScore): 'Hero' | 'Anti-herói' | 'Vilão' {
    // conta apenas respostas com delta != 0
    const nn = this._state().answers.filter(a => a.delta !== 0).length;
    const played = nn || 0;
    const t = Math.max(1, Math.ceil(played * 0.5)); // maioria simples sobre não-neutras

    if (moral >= t)   return 'Hero';
    if (moral <= -t)  return 'Vilão';
    return 'Anti-herói';
  }

  private finish() {
    this.clearTimer();
    this._state.update(s => ({ ...s, started: false, finished: true }));

    // salva ranking local
    const key = 'hv-quiz-leaderboard';
    const nn = this._state().answers.filter(a => a.delta !== 0).length;
    const profile = this.getResultType(this.state().moralScore);
    const row = {
      when: Date.now(),
      score: this._state().score,
      total: this._state().total,
      streak: this._state().streak,
      lives: this._state().lives,
      moral: this._state().moralScore,
      nn,              // ← salva não-neutras jogadas
      profile          // ← perfil já resolvido
    };
    const arr = JSON.parse(localStorage.getItem(key) || '[]');
    arr.push(row);
    arr.sort((a: any, b: any) => b.score - a.score);
    localStorage.setItem(key, JSON.stringify(arr.slice(0, 20)));
  }
}
