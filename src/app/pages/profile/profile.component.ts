import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable, Subject, filter, takeUntil } from 'rxjs';

import { UsersFacade } from '@store/users/users.facade';
import { LIKE_TEXT } from '@shared/data/sentences';
import { User } from '@shared/types/interface.types';
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
  user$: Observable<User>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private userFcd: UsersFacade,
    private postFacade: PostsFacade,
    private draftsFacade: DraftsFacade
  ) { }

  ngOnInit(): void {
    this.user$ = this.userFcd.user$;
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
