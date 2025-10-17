import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import {DIFFICULTY_LABELS} from '../../utils/constants';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './leaderboard.html',
  styleUrls: ['./leaderboard.scss']
})
export class LeaderboardComponent {
  // calcula perfil usando não-neutras (nn). Se não houver nn salvo, usa total como fallback.
  private computeProfile(moral: number, nn: number, total: number): 'Hero' | 'Vilão' | 'Anti-herói' {
    const base = nn ?? total ?? 0;
    const t = Math.max(1, Math.ceil(base * 0.5));
    if (moral >= t)  return 'Hero';
    if (moral <= -t) return 'Vilão';
    return 'Anti-herói';
  }

  get rows() {
    const key = 'hv-quiz-leaderboard';
    const list = JSON.parse(localStorage.getItem(key) || '[]') as Array<any>;
    return list.map(r => {
      const lvl = r.level ?? 'todas';
      const levelLabel = DIFFICULTY_LABELS[lvl as keyof typeof DIFFICULTY_LABELS] ?? 'Misto';
      return {
        ...r,
        profile: r.profile ?? this.computeProfile(r.moral ?? 0, r.nn ?? 0, r.total ?? 0),
        levelLabel
      };
    });
  }

clear(){ localStorage.removeItem('hv-quiz-leaderboard'); }
}
