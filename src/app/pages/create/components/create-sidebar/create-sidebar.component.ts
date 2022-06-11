import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { Post } from '@shared/types/interface.types';
import { debounceTime, distinctUntilChanged, map, Subject, takeUntil, tap, of } from 'rxjs';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateSidebarComponent implements OnInit, OnDestroy {

  @Input() drafts!: Post[] | null;
  @Input() active: Post;
  private unsubscribe$ = new Subject<void>();
  row = 0;
  editable = true;

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void { }

  public activate(draft: Post): void {
    this.draftsFacade.setActive(draft);
  }

  public change(draft: Post): void {
    if (!draft.title) { return; }
    this.draftsFacade.updateKey(draft._id, {key: 'title', value: draft.title});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
