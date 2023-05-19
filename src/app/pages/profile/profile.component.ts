import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';

import { LIKE_TEXT } from '@shared/data/sentences';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent implements OnInit {

  text = LIKE_TEXT;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private postFacade: PostsFacade,
    private draftsFacade: DraftsFacade
  ) { }

  ngOnInit(): void {
    this.checkData();
  }

  private checkData(): void {
    this.postFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.postFacade.get());

    this.draftsFacade.loaded$
    .pipe(
      filter(res => !res),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(_ => this.draftsFacade.get());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
