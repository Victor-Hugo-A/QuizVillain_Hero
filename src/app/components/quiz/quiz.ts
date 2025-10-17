// PATCH: acrescente/imports se faltar
import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuestionComponent } from '../question/question';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuestionComponent],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss']
})
export class QuizComponent {
  private quiz = inject(QuizService);
  private router = inject(Router);

  state = this.quiz.state;
  current = this.quiz.currentQuestion;
  progress = this.quiz.progress;

  finished = computed(() => this.state().finished);
  score    = computed(() => this.state().score);
  streak   = computed(() => this.state().streak);

  // 🔥 flag para animar quando o streak aumentar
  streakFlash = signal(false);

  ngOnInit() {
    const s = this.state();
    if (!s.started && !s.finished && s.total === 0) this.quiz.start();
  }

  onPick(optionId: string) {
    const before = this.streak();         // streak atual
    this.quiz.answerById(optionId);       // responde

    // se terminou, vai para resultados
    if (this.state().finished) {
      queueMicrotask(() => this.router.navigateByUrl('/result'));
      return;
    }

    // se o streak aumentou, disparamos a animação
    const after = this.streak();
    if (after > before) {
      this.streakFlash.set(false);
      // força reflow para reiniciar a animação
      requestAnimationFrame(() => this.streakFlash.set(true));
    }
  }

  reset() {
    this.quiz.reset();
    this.router.navigateByUrl('/');
  }

  get headerAccent(): 'hero'|'villain'|'neutral' {
    const m = this.quiz.state().moralScore;
    if (m >= 6) return 'hero';
    if (m <= -6) return 'villain';
    return 'neutral';
  }
}
