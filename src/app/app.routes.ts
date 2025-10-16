import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz';
import { ResultComponent } from './components/result/result';
import {StartComponent} from './components/start/start';
import {LeaderboardComponent} from './components/leaderboard/leaderboard';

export const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'play', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', redirectTo: '' }
];
