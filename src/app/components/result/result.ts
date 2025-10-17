import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import {DIFFICULTY_LABELS} from '../../utils/constants';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './result.html',
  styleUrls: ['./result.scss']
})
export class ResultComponent {
  constructor(private quiz: QuizService) {}

  // Signals getters (evita “used before initialization”)
  get st() { return this.quiz.state; }

  get title() {
    // 'Hero' | 'Vilão' | 'Anti-herói'
    return this.quiz.getResultType(this.st().moralScore);
  }

  get levelLabel() {
    // se preferir, pode inferir por pergunta atual; aqui usamos a config da partida
    const s = this.st();
    // tentativa de encontrar em localStorage caso tenha vindo por rota sem service (opcional)
    const label = (this as any).quiz?.config?.()?.difficulty ?? 'todas';
    return DIFFICULTY_LABELS[label as keyof typeof DIFFICULTY_LABELS] ?? 'Misto';
  }


// chave para imagem no /public/images
  get kind(): 'hero' | 'villain' | 'anti-hero' {
    if (this.title === 'Hero') return 'hero';
    if (this.title === 'Vilão') return 'villain';
    return 'anti-hero';
  }

  // caminho público (Vite/Angular 17+ serve /public na raiz)
  get imageSrc() {
    return `/images/${this.kind}.png`;
  }

  get description() {
    switch (this.title) {
      case 'Hero':
        return 'Você tende a agir pelo coletivo, assume responsabilidades e inspira confiança.';
      case 'Vilão':
        return 'Ambição, estratégia e zero paciência para limites. Canalize esse poder com sabedoria.';
      default:
        return 'Equilíbrio entre luz e sombra: pragmático, adaptável e difícil de rotular.';
    }
  }

  share() {
    const s = this.st();
    const text = `Cai em ${this.title}! Pontos: ${s.score} em ${s.total} perguntas.`;
    if (navigator.share) {
      navigator.share({ title: 'Hero/Villain Quiz', text, url: location.href }).catch(()=>{});
    } else {
      navigator.clipboard?.writeText(`${text} — ${location.href}`);
      alert('Resultado copiado!');
    }
  }

  replay() {
    this.quiz.reset();
    location.href = '/';
  }
}
