import { Injectable, computed, signal } from '@angular/core';
import { QUESTIONS, RESULT_THRESHOLDS } from '../utils/constants';
import { Alignment, QuizState, ResultType } from '../models/quiz.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private _state = signal<QuizState>({
    currentIndex: 0,
    score: 0,
    answers: [],
    finished: false,
    total: QUESTIONS.length
  });

  state = computed(() => this._state());
  progress = computed(() => (this._state().currentIndex / this._state().total) * 100);
  currentQuestion = computed(() => QUESTIONS[this._state().currentIndex]);

  selectAnswer(choice: Alignment) {
    const q = QUESTIONS[this._state().currentIndex];
    const opt = q.options.find(o => o.value === choice)!;
    const nextScore = this._state().score + opt.delta;

    const nextIndex = this._state().currentIndex + 1;
    const finished = nextIndex >= QUESTIONS.length;

    this._state.update(s => ({
      ...s,
      currentIndex: finished ? s.currentIndex : nextIndex,
      score: nextScore,
      answers: [...s.answers, { questionId: q.id, choice }],
      finished
    }));
  }

  reset() {
    this._state.set({
      currentIndex: 0,
      score: 0,
      answers: [],
      finished: false,
      total: QUESTIONS.length
    });
  }

  getResultType(score = this._state().score): ResultType {
    if (score >= RESULT_THRESHOLDS.HERO) return 'Hero';
    if (score <= RESULT_THRESHOLDS.VILLAIN) return 'Vilão';
    return 'Anti-herói';
  }
}
