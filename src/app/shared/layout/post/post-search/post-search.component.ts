import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { FilterType, SearchType } from '@shared/types/interface.types';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';

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

  switchObj = {
    'pendiente': 'pending',
    'visto': 'seen',
    'no visto': 'not-seen'
  };

  constructor(private postFacade: PostsFacade, private draftsFacade: DraftsFacade) { }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').
     pipe(
      map((ev: any) => ev.target?.value as string),
      debounceTime(500),
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

  private convertStatus(value: string): string {
    return this.switchObj[value.toLowerCase().trim()];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
