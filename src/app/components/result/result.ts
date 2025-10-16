import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [],
  templateUrl: './result.html',
  styleUrls: ['./result.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) image!: string;
  @Input({ required: true }) score!: number;
}
