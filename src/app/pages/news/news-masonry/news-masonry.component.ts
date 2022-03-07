import { 
  Component, 
  OnInit, 
  OnDestroy,
  Input
 } from '@angular/core';

 import { 
  fromEvent, 
  filter, 
  takeWhile, 
  debounceTime, 
  Subject, 
  takeUntil 
} from 'rxjs';

import { MasonryService } from '@core/services/masonry/masonry.service';
import { MasonryType } from '@shared/types/class.types';


@Component({
  selector: 'app-news-masonry',
  templateUrl: './news-masonry.component.html',
  styleUrls: ['./news-masonry.component.scss']
})

export class NewsMasonryComponent implements OnInit, OnDestroy {

  @Input() duration!: number;
  isLoaded = false;
  grid!: HTMLElement | null;
  wrapper!: Element | null;
  $unsubscribe = new Subject<void>();
  masonry!: MasonryType;
  items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

  constructor(private masonrySrv: MasonryService) { }

  ngOnInit(): void {
    setTimeout(() => this.initMasonry(), this.duration);
    this.hasEnded();
  }

  private initMasonry(): void {
    this.wrapper = document.querySelector('.grid');
    this.grid = document.getElementById('grid');
    this.createMasonry();
  }

  private createMasonry(): void {
    if (this.wrapper) {
      this.isLoaded = true;
      setTimeout(() => {
        this.masonry = this.masonrySrv.createMasonry(this.wrapper);
      }, 150);
    }
  }

  private hasEnded(): void {
    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.$unsubscribe),
        filter(_ => !!this.items.length && !!this.masonry),
        takeWhile(() => this.items.length <= 50),
        filter((_: any) => (
          this.grid!.offsetHeight - 
          _.target.scrollingElement.scrollTop <= 450
        )),
        debounceTime(200)
      )
    .subscribe(_ => this.makeScroll());
  }

  private makeScroll(): void {
    try {
      const el = Array.from(
        document.querySelectorAll('.grid-item')
      ).slice(0, 3);
      this.addElements(el);
    } catch (err) { console.log(err); }
  }

  private addElements(el: Element[]): void {
    this.masonry.appended(el);
    this.createMasonry();
    this.items.push(...[1, 2, 3]);
  }

  public remove(el: HTMLDivElement): void {
    this.masonry.remove([el]);
    this.masonry.layout();
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}


