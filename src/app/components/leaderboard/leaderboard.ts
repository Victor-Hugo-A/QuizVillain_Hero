import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [DatePipe], // ✅ habilita |date no template
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.scss']
})
export class LeaderboardComponent {
  get rows() {
    const key = 'hv-quiz-leaderboard';
    return JSON.parse(localStorage.getItem(key) || '[]') as Array<any>;
  }
  clear() { localStorage.removeItem('hv-quiz-leaderboard'); }
}
