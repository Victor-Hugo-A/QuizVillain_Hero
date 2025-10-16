import { Component, computed, inject } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { QuestionComponent } from '../question/question';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuestionComponent, RouterLink], // ✅ necessário p/ <app-result> e <app-question>
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

  ngOnInit() {
    // inicia a partida se ainda não iniciou
    if (!this.state().started && !this.state().finished && this.state().total === 0) {
      this.quiz.start();
    }
  }

  onPick(optionId: string) {
    this.quiz.answerById(optionId);
    if (this.state().finished) this.router.navigateByUrl('/result');
  }

  reset() {
    this.quiz.reset();
    this.router.navigateByUrl('/');
  }

  // usado nos power-ups caso você os tenha no template desta tela
  freeze() { this.quiz.powerFreeze(); }
  dbl()    { this.quiz.powerDouble(); }
  skip()   { this.quiz.powerSkip(); }
  resume() { this.quiz.resumeTimer(); }

  // Acento visual por “tendência” moral (se usado no template)
  get headerAccent(): 'hero'|'villain'|'neutral' {
    const m = this.quiz.state().moralScore;
    if (m >= 6) return 'hero';
    if (m <= -6) return 'villain';
    return 'neutral';
  }

  // ✅ fornecidos p/ <app-result> no quiz.html
  resultTitle = computed(() => this.quiz.getResultType(this.quiz.state().moralScore));

  resultInfo = computed(() => {
    const t = this.resultTitle();
    if (t === 'Hero')   return { img: '/images/hero.png',    desc: 'Você age pelo coletivo e inspira confiança.' };
    if (t === 'Vilão')  return { img: '/images/villain.png', desc: 'Ambição e estratégia sem paciência para limites.' };
    return                 { img: '/images/anti-hero.png',    desc: 'Equilíbrio tenso entre luz e sombra — pragmático.' };
  });
}
