import { Routes } from '@angular/router';
import { Quiz } from './components/quiz/quiz';
import { Result } from './components/result/result';

export const routes: Routes = [
  { path: '', component: Quiz }, // Rota inicial para o quiz
  { path: 'result', component: Result }, // Rota para o resultado
  { path: '**', redirectTo: '' } // Redireciona para o quiz em caso de rota desconhecida
];
