import type { Question, Category, Difficulty } from '../models/quiz.model';

export const CATEGORIES: Category[] = ['ética','decisões','liderança','tecnologia'];
export const DIFFICULTIES: Difficulty[] = ['easy','medium','hard'];

const q = (id:string, category:Category, difficulty:Difficulty, prompt:string, opts:[string,number][]) =>
  ({
    id, category, difficulty, prompt,
    options: opts.map(([label,delta],i)=>({ id:`${id}-o${i+1}`, label, delta: (delta as -1|0|1) })) as any
  }) as Question;

// 16 perguntas (4 categorias x 4), 4 alternativas cada, com deltas (+1 / 0 / -1) p/ feedback
export const QUESTIONS: Question[] = [
  q('q1','ética','easy','Ao ver uma injustiça no trabalho, você:',[
    ['Intervém e aciona os responsáveis', +1],
    ['Observa e pensa depois', 0],
    ['Vira as costas, não é problema seu', -1],
    ['Posta indiretamente nas redes', -1],
  ]),
  q('q2','decisões','easy','Para decisões difíceis, você prioriza:',[
    ['Bem-estar coletivo', +1], ['Equilíbrio', 0], ['Seus ganhos', -1], ['O caminho “menos trabalhoso”', -1],
  ]),
  q('q3','liderança','easy','Seu time falhou na sprint, você:',[
    ['Assume e replaneja', +1], ['Aprende e documenta', 0], ['Culpa alguém publicamente', -1], ['Esconde o erro', -1],
  ]),
  q('q4','tecnologia','easy','Com uma ferramenta poderosa nova, você:',[
    ['Compartilha com responsabilidade', +1], ['Testa privado e depois decide', 0], ['Vende acesso exclusivo', -1], ['Oculta e monopoliza', -1],
  ]),
  q('q5','ética','medium','Descobre um bug crítico em produção:',[
    ['Corrige e informa o impacto', +1], ['Abre ticket e agenda', 0], ['Apaga logs e finge normalidade', -1], ['Joga a culpa no legado', -1],
  ]),
  q('q6','decisões','medium','Um parceiro pede ajuda no pico:',[
    ['Reprioriza e apoia', +1], ['Indica um tutorial', 0], ['Cobra favor futuro', -1], ['Ignora por “foco”', -1],
  ]),
  q('q7','liderança','medium','Feedback difícil com o time:',[
    ['Faz 1:1 com dados e empatia', +1], ['Envia texto genérico', 0], ['Humilha em reunião', -1], ['Evita falar', -1],
  ]),
  q('q8','tecnologia','medium','Dados sensíveis sob sua guarda:',[
    ['Protege e audita acessos', +1], ['Adia proteção por sprint', 0], ['Compartilha no grupo', -1], ['Exporta para e-mail pessoal', -1],
  ]),
  q('q9','ética','hard','Pressão da diretoria por prazo impossível:',[
    ['Negocia escopo e riscos', +1], ['Entrega parcial', 0], ['Promete tudo “dando seus pulos”', -1], ['Manipula métricas', -1],
  ]),
  q('q10','decisões','hard','Escolha impopular porém correta:',[
    ['Explica e banca a decisão', +1], ['Tenta conciliar a todos', 0], ['Cede a quem tem mais poder', -1], ['Joga a decisão no colo do time', -1],
  ]),
  q('q11','liderança','hard','Conflito entre pares seniores:',[
    ['Media com fatos e objetivos', +1], ['Espera “passar”', 0], ['Toma partido “político”', -1], ['Incentiva a competição tóxica', -1],
  ]),
  q('q12','tecnologia','hard','Feature popular que coleta muitos dados:',[
    ['Implementa com privacidade by design', +1], ['Lança beta com termo', 0], ['Coleta tudo por “IA”', -1], ['Vende o dataset', -1],
  ]),
  // extras
  q('q13','ética','medium','Crédito por trabalho do time:',[
    ['Dá visibilidade e divide mérito', +1], ['Agradece em privado', 0], ['Assina sozinho', -1], ['Apaga o histórico', -1],
  ]),
  q('q14','decisões','easy','Prioridade em roadmap apertado:',[
    ['Valor ao usuário e risco', +1], ['Demanda mais barulhenta', 0], ['O que dá mais visibilidade pessoal', -1], ['O que é “mais fácil”', -1],
  ]),
  q('q15','liderança','medium','Onboarding de júnior no time:',[
    ['Plano e mentoria ativos', +1], ['Docs e boa sorte', 0], ['Joga em produção no 1º dia', -1], ['Vira meme do time', -1],
  ]),
  q('q16','tecnologia','easy','Alertas vermelhos de segurança:',[
    ['Trata imediatamente', +1], ['Agenda para amanhã', 0], ['Silencia o alerta', -1], ['Desativa a ferramenta', -1],
  ]),
];

export const DEFAULT_CONFIG = {
  perQuestionSeconds: 20
};
