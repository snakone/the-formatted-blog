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
  Subject, 
  takeUntil, 
  throttleTime
} from 'rxjs';

import { MasonryService } from '@core/services/masonry/masonry.service';
import { MasonryType } from '@shared/types/class.types';
import { FormattedNew } from '@shared/types/interface.types';

@Component({
  selector: 'app-news-masonry',
  templateUrl: './news-masonry.component.html',
  styleUrls: ['./news-masonry.component.scss']
})

export class NewsMasonryComponent implements OnInit, OnDestroy {

  @Input() news: FormattedNew[] | undefined;
  @Input() duration!: number;
  isLoaded = false;
  grid!: HTMLElement | null;
  $unsubscribe = new Subject<void>();
  masonry!: MasonryType;
  multiply = 3;
  currentPage = 1;
  items: FormattedNew[] = [];

  constructor(private masonrySrv: MasonryService) { }

  ngOnInit(): void {
    setTimeout(() => this.initMasonry(), this.duration);
    this.hasEnded();
  }

  private initMasonry(): void {
    this.grid = document.getElementById('grid');
    if (this.grid) { 
      this.createMasonry();
      this.items.push(...this.news.slice(0, 7));
      this.currentPage = this.multiply;
    }
  }

  private createMasonry(update = false): void {
    this.isLoaded = true;

    try {
      setTimeout(() => {
        this.masonry = this.masonrySrv.createMasonry(this.grid);
      }, update ? 0 : 150);
    } catch (err) {
      console.log(err);
      this.isLoaded = false;
    }
  }

  private hasEnded(): void {
    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.$unsubscribe),
        filter(_ => !!this.items.length && !!this.masonry),
        takeWhile(() => this.items.length <= 50),
        throttleTime(100),
        filter((_: any) => (
          this.grid!.offsetHeight - 
          _.target.scrollingElement.scrollTop <= 475
        ))
      ).subscribe(_ => this.makeScroll());
  }

  private makeScroll(): void {
    try {
      this.addElements();
    } catch (err) { 
      console.log(err);
      this.isLoaded = false;
    }
  }

  private addElements(): void {
    const skip = this.currentPage * this.multiply;
    this.items.push(...this.news.slice(skip, skip + this.multiply));
    this.currentPage++;
    this.createMasonry(true);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 2000);
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}


