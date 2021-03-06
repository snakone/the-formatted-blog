import { HammerGestureConfig } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()

export class HammerConfig extends HammerGestureConfig {
  overrides = {
      pan: { direction: 6 },
      swipe: { enable: false },
      pinch: { enable: false },
      rotate: { enable: false }
  };
}
