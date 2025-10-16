export type Alignment = 'hero' | 'villain' | 'neutral';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'ética' | 'decisões' | 'liderança' | 'tecnologia';

export type ResultType = 'Hero' | 'Anti-herói' | 'Vilão';

export interface Option {
  id: string;
  label: string;
  /** Impacto moral/jogável: +1=herói, 0=neutro, -1=vilão */
  delta: -1 | 0 | 1;
}

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  prompt: string;
  /** Sempre 4 alternativas */
  options: [Option, Option, Option, Option];
}

export interface PlayConfig {
  category: Category | 'todas';
  difficulty: Difficulty | 'todas';
  /** Tempo por pergunta (s) */
  perQuestionSeconds: number;
}

export interface QuizState {
  loading: boolean;
  started: boolean;
  finished: boolean;

  currentIndex: number;
  total: number;

  /** Pontos de jogo (base 100/−100, com multiplicadores) */
  score: number;
  /** Soma de deltas para o perfil final (herói/vilão) */
  moralScore: number;

  speedMultiplier: number;
  streak: number; // 0..5

  lives: number;
  /** double: 1 disponível, 0 usado; -1 = marcado para próxima resposta */
  powerups: { freeze: number; double: number | -1; skip: number };

  /** Tempo restante da pergunta (s) */
  timeLeft: number;

  /** Log da partida (para tela de resultados) */
  answers: Array<{
    qid: string;
    picked: string | null; // option.id
    delta: -1 | 0 | 1;
    timeLeft: number;
    gained: number;
  }>;
}
