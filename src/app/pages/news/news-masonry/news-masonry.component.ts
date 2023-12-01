import { 
  Component, 
  Input,
  DestroyRef
 } from '@angular/core';

 import { 
  fromEvent, 
  filter, 
  takeWhile, 
  throttleTime
} from 'rxjs';

import { MasonryService } from '@core/services/masonry/masonry.service';
import { MasonryType } from '@shared/types/class.types';
import { FormattedNew } from '@shared/types/interface.app';
import { RESIZE_EVENT } from '@shared/data/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const multiply = 3;
const maxNumberPost = 50;
const loadingDuration = 1500;
const minScrollToStart = 475;

@Component({
  selector: 'app-news-masonry',
  templateUrl: './news-masonry.component.html',
  styleUrls: ['./news-masonry.component.scss']
})

export class NewsMasonryComponent {

  @Input() news: FormattedNew[] | undefined;
  @Input() duration: number = loadingDuration;
  isLoaded = false;
  grid!: HTMLElement | null;
  masonry!: MasonryType;
  currentPage = 1;
  items: FormattedNew[] = [];

  constructor(private masonrySrv: MasonryService, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    setTimeout(() => this.initMasonry(), this.duration);
    this.hasEnded();
  }

  private initMasonry(): void {
    this.grid = document.getElementById('grid');
  
    if (!this.grid || !this.news) {
      return;
    }
  
    this.createMasonry();
    this.items.push(...this.news.slice(0, 7));
    this.currentPage = multiply;
  }

  private async createMasonry(update = false): Promise<void> {
    this.isLoaded = true;
  
    try {
      await new Promise(resolve => setTimeout(resolve, update ? 0 : 150));
      this.masonry = this.masonrySrv.createMasonry(this.grid);
    } catch (err) {
      console.error(err);
      this.isLoaded = false;
    }
  }

  private hasEnded(): void {
    fromEvent(window, 'scroll')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(_ => !!this.items.length && !!this.masonry),
        takeWhile(() => this.items.length <= maxNumberPost),
        throttleTime(100),
        filter(({target}: any) => (
          this.grid!.offsetHeight - 
          target.scrollingElement.scrollTop <= minScrollToStart
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
    const skip = this.currentPage * multiply;
    if (this.news) {
      this.items.push(...this.news.slice(skip, skip + multiply));
      this.currentPage++;
      this.createMasonry(true);
    }

    setTimeout(() => {
      window.dispatchEvent(new Event(RESIZE_EVENT));
    }, 2000);
  }

}


