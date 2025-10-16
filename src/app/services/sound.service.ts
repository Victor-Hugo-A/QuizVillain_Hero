import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private cache = new Map<string, HTMLAudioElement>();

  private get(src: string) {
    if (!this.cache.has(src)) {
      const a = new Audio(src);
      a.preload = 'auto';
      this.cache.set(src, a);
    }
    return this.cache.get(src)!;
  }

  playCorrect() { }
  playWrong()   { }
  playTick()    { }
  playPower()   { }

  private async tryPlay(src: string) {
    try {
      const node = this.get(src).cloneNode(true) as HTMLAudioElement;
      await node.play();
    } catch {
      /* autoplay bloqueado — tudo bem */
    }
  }
}
