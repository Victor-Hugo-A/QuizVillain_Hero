export type Alignment = 'hero' | 'villain' | 'neutral';

export interface AnswerOption {
  label: string;
  value: Alignment;
  delta: number; // +1, -1, 0
}

export interface Question {
  id: string;
  prompt: string;
  options: AnswerOption[];
}

export type ResultType = 'Hero' | 'Anti-herói' | 'Vilão';

export interface QuizState {
  currentIndex: number;
  score: number;
  answers: { questionId: string; choice: Alignment }[];
  finished: boolean;
  total: number;
}
