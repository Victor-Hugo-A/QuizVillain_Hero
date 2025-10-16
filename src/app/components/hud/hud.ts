import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hud',
  standalone: true,
  templateUrl: './hud.html',
  styleUrls: ['./hud.scss']
})
export class HudComponent {
  @Input({required:true}) progress = 0;
  @Input({required:true}) timeLeft = 20;
  @Input({required:true}) total = 0;
  @Input({required:true}) index = 0;
  @Input({required:true}) lives = 3;
  @Input({required:true}) powerups!: { freeze:number; double:number; skip:number };

  @Output() freeze = new EventEmitter<void>();
  @Output() dbl = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();
  @Output() resume = new EventEmitter<void>();
}
