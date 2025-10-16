import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz';
import { ResultComponent } from './components/result/result';

export const routes: Routes = [
  { path: '', component: QuizComponent }, // Rota inicial para o quiz
  { path: 'result', component: ResultComponent }, // Rota para o resultado
  { path: '**', redirectTo: '' } // Redireciona para o quiz em caso de rota desconhecida
];
