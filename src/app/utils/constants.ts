import { Question } from '../models/quiz.model';

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    prompt: 'Ao testemunhar uma injustiça, sua primeira reação é:',
    options: [
      { label: 'Intervir imediatamente', value: 'hero', delta: +1 },
      { label: 'Avaliar como pode se beneficiar', value: 'villain', delta: -1 },
      { label: 'Observar de longe', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q2',
    prompt: 'O que você prioriza ao tomar decisões importantes?',
    options: [
      { label: 'O bem-estar coletivo', value: 'hero', delta: +1 },
      { label: 'Seus objetivos pessoais', value: 'villain', delta: -1 },
      { label: 'Equilíbrio entre ambos', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q3',
    prompt: 'Se um rival te provoca em público:',
    options: [
      { label: 'Respira, mantém a calma e resolve com classe', value: 'hero', delta: +1 },
      { label: 'Humilha com estilo e um sorriso afiado', value: 'villain', delta: -1 },
      { label: 'Ignora e segue a vida', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q4',
    prompt: 'Uma tecnologia poderosa cai em suas mãos.',
    options: [
      { label: 'Compartilha com a sociedade, com responsabilidade', value: 'hero', delta: +1 },
      { label: 'Monetiza e controla o acesso', value: 'villain', delta: -1 },
      { label: 'Esconde até entender melhor', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q5',
    prompt: 'Como lida com regras?',
    options: [
      { label: 'Regras protegem pessoas', value: 'hero', delta: +1 },
      { label: 'Regras são ferramentas, não correntes', value: 'villain', delta: -1 },
      { label: 'Depende do contexto', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q6',
    prompt: 'Seu time falha na missão.',
    options: [
      { label: 'Assume a responsabilidade e reagrupa', value: 'hero', delta: +1 },
      { label: 'Culpa alguém e troca a equipe', value: 'villain', delta: -1 },
      { label: 'Pausa, reavalia e tenta depois', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q7',
    prompt: 'Você prefere ser lembrado por:',
    options: [
      { label: 'Salvar o dia', value: 'hero', delta: +1 },
      { label: 'Dominar o jogo', value: 'villain', delta: -1 },
      { label: 'Escapar ileso', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q8',
    prompt: 'Ao ver um bug crítico em produção:',
    options: [
      { label: 'Corrige, documenta e previne', value: 'hero', delta: +1 },
      { label: 'Esconde o log e “tá resolvido”', value: 'villain', delta: -1 },
      { label: 'Abre um ticket e vai almoçar', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q9',
    prompt: 'Um aliado pede ajuda quando você está atarefado:',
    options: [
      { label: 'Ajusta prioridades e ajuda', value: 'hero', delta: +1 },
      { label: 'Cobra favores futuros', value: 'villain', delta: -1 },
      { label: 'Indica um tutorial', value: 'neutral', delta: 0 },
    ]
  },
  {
    id: 'q10',
    prompt: 'Seu lema secreto é:',
    options: [
      { label: 'Poder com responsabilidade', value: 'hero', delta: +1 },
      { label: 'Poder é a responsabilidade', value: 'villain', delta: -1 },
      { label: 'Depende das métricas', value: 'neutral', delta: 0 },
    ]
  },
];

export const RESULT_THRESHOLDS = {
  HERO: 6,       // 6+ pontos => Herói
  VILLAIN: -6    // -6 ou menor => Vilão
};
