import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { QuestionComponent } from '../question/question';
import { ResultComponent } from '../result/result';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [QuestionComponent, ResultComponent],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent {
  private quiz = inject(QuizService);

  state = this.quiz.state;
  progress = this.quiz.progress;
  current = this.quiz.currentQuestion;

  finished = computed(() => this.state().finished);
  score = computed(() => this.state().score);

  get headerAccent(): 'hero' | 'villain' | 'neutral' {
    const s = this.score();
    if (s >= 6) return 'hero';
    if (s <= -6) return 'villain';
    return 'neutral';
  }

  onPick(choice: string) {
    this.quiz.selectAnswer(choice as any); // 'hero' | 'villain' | 'neutral'
  }

  resultTitle = computed(() => this.quiz.getResultType(this.score()));
  resultInfo = computed(() => {
    const t = this.resultTitle();
    if (t === 'Hero') {
      return {
        img: '/images/hero.png',
        desc: 'Você tende a agir pelo coletivo, assumir responsabilidades e inspirar confiança.'
      };
    }
    if (t === 'Vilão') {
      return {
        img: '/images/villain.png',
        desc: 'Ambição e estratégia à flor da pele. Canalize esse poder com sabedoria.'
      };
    }
    return {
      img: '/images/anti-hero.png',
      desc: 'Você navega no meio-termo: pondera contexto, custos e faz o necessário.'
    };
  });

  reset() { this.quiz.reset(); }
}
