import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import type { Question } from '../../models/quiz.model';

@Component({
  selector: 'app-question',
  standalone: true,
  templateUrl: './question.html',
  styleUrls: ['./question.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent {
  @Input({ required: true }) question!: Question;
  @Output() pick = new EventEmitter<string>(); // 'hero' | 'villain' | 'neutral'
}
