import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CATEGORIES, DIFFICULTIES } from '../../utils/constants';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-start',
  standalone: true,
  templateUrl: './start.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./start.scss']
})
export class StartComponent {
  categories = ['todas', ...CATEGORIES] as const;
  difficulties = ['todas', ...DIFFICULTIES] as const;

  constructor(private router: Router, private quiz: QuizService) {}

  // ✅ getter elimina TS2729
  get cfg() { return this.quiz.config; }

  setCategory(cat: any){ this.quiz.setConfig({ category: cat }); }
  setDifficulty(d: any){ this.quiz.setConfig({ difficulty: d }); }
  setTime(v: number){ this.quiz.setConfig({ perQuestionSeconds: v }); }

  go() { this.router.navigateByUrl('/play'); }
}
