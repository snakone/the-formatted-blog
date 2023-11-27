import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';

import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { FilterType } from '@shared/types/interface.app';
import { SearchType, DraftStatus, DraftStatusEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostSearchComponent {

  @ViewChild('input', {static: true}) input: ElementRef;
  @Input() type: SearchType;
  private unsubscribe$ = new Subject<void>();

  switchSearch: {[key: string]: DraftStatus} = {
    'pendiente': DraftStatusEnum.PENDING,
    'visto': DraftStatusEnum.SEEN,
    'no visto': DraftStatusEnum.NOT_SEEN
  };

  constructor(private postFacade: PostsFacade) { }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').
     pipe(
      map((ev: any) => ev.target?.value as string),
      debounceTime(100),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
     ).subscribe((value: string) => 
     this.postFacade.setFilter(this.createFilter(value)));
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
    return this.switchSearch[(value || '').toLowerCase().trim()];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
