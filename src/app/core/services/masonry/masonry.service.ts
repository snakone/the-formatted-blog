import { Injectable } from '@angular/core';
import { MasonryType } from '@shared/types/class.types';

declare const Masonry: any;

@Injectable()

export class MasonryService {

  constructor() { }

  public createMasonry(el: Element | null): MasonryType {
      return new Masonry(el, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true,
        gutter: 30.5,
        stagger: 10,
        transitionDuration: '0.2s'
      });
  }

}