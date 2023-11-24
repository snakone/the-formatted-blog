import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';

import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { SearchType, FilterType, DraftStatus } from '@shared/types/interface.app';
import { NOT_SEEN_KEY, PENDING_KEY, SEEN_KEY } from '@shared/data/constants';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostSearchComponent {

  @ViewChild('input', {static: true}) input: ElementRef;
  private unsubscribe$ = new Subject<void>();
  @Input() type: SearchType;

  switchObj: {[key: string]: DraftStatus} = {
    'pendiente': PENDING_KEY,
    'visto': SEEN_KEY,
    'no visto': NOT_SEEN_KEY
  };

  constructor(private postFacade: PostsFacade) { }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').
     pipe(
      map((ev: any) => ev.target?.value as string),
      debounceTime(100),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
     ).subscribe((value: string) => this.postFacade.setFilter(this.createFilter(value)));
  }

  private createFilter(value: string): FilterType {
    return {
      title: value,
      category: value,
      author: value,
      status: this.convertStatus(value),
      type: this.type
    }
  }

  private convertStatus(value: string): DraftStatus {
    return this.switchObj[value.toLowerCase().trim()];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
