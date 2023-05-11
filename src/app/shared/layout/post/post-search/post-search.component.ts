import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { FilterType } from '@shared/types/interface.types';
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
  @Input() type: 'draft' | 'post';

  switchObj = {
    draft: (value: FilterType) => this.draftsFacade.setFilter(value),
    post: (value: FilterType) => this.postFacade.setFilter(value)
  }

  constructor(private postFacade: PostsFacade, private draftsFacade: DraftsFacade) { }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup').
     pipe(
      map((ev: any) => ev.target?.value as string),
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
     ).subscribe((value: string) => this.switchObj[this.type](this.createFilter(value)));
  }

  private createFilter(value: string): FilterType {
    return {
      title: value,
      category: value,
      author: value,
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
