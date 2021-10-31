import { 
  Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  Output, 
  EventEmitter, 
  Input
 } from '@angular/core';

import { fromEvent, filter, takeWhile, debounceTime } from 'rxjs';

declare const Masonry: any;

@Component({
  selector: 'app-news-masonry',
  templateUrl: './news-masonry.component.html',
  styleUrls: ['./news-masonry.component.scss']
})

export class NewsMasonryComponent implements OnInit {

  @Input() isLoaded = false;
  @Output() loaded = new EventEmitter<void>();
  grid!: HTMLElement | null;
  wrapper!: Element | null;

  firstTime = true;
  masonry!: MasonryType;
  items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.wrapper = document.querySelector('.grid');
      this.grid = document.getElementById('grid');
      this.createMasonry();
      this.hasEnded();
    }, 2000);
  }

  private createMasonry(emit = true): void {
    setTimeout(() => {
      this.masonry = new Masonry(this.wrapper, {
        itemSelector: '.grid-item',
        percentPosition: true,
        horizontalOrder: true,
        gutter: 30.5,
        stagger: 10,
        transitionDuration: '0.2s'
      });
  
      if (emit) {
        this.loaded.emit();
      }
      this.firstTime = false;
      this.masonry.layout();
    }, 123);
  }

  private hasEnded(): void {
    fromEvent(window, 'scroll')
      .pipe(
        filter(_ => !!this.items.length && !!this.masonry),
        takeWhile(() => this.items.length <= 50),
        debounceTime(200)
      )
    .subscribe(e => this.makeScroll(e));
  }

  private makeScroll(e: any): void {
    const bottom = 450;
    try {
      const top = e.target.scrollingElement.scrollTop;
      if (this.grid && (
        this.grid.offsetHeight - top <= bottom
      )) {

        const el = Array.from(document.querySelectorAll('.grid-item')).slice(0, 3);

        this.masonry.appended(el);
        this.createMasonry(false);
        this.items.push(...[1, 2, 3]);
        if (this.firstTime) {
          setTimeout(() => this.createMasonry(false), 1000);
        }
     }
    } catch (err) { console.log(err); }
  }

  public remove(el: HTMLDivElement): void {
    this.masonry.remove([el]);
    this.masonry.layout();
  }

}

class MasonryType {
  public layout!: () => void;
  public appended!: (els: Element[]) => void;
  public prepended!: (els: Element[]) => void;
  public remove!: (els: Element[]) => void;
}
