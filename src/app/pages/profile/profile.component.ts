import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Subject, filter, takeUntil } from 'rxjs';

import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { UserService } from '@core/services/api/users.service';

import { LIKE_TEXT } from '@shared/data/sentences';

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
    private draftsFacade: DraftsFacade,
    private userSrv: UserService
  ) { }

  ngOnInit(): void {
    this.checkData();
  }

  private checkData(): void {
    const user = this.userSrv.getUser();
    
    this.postFacade.byUserLoaded$
     .pipe(
       filter(res => !res && Boolean(user)),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.postFacade.getByUser(user._id));

    this.draftsFacade.loaded$
    .pipe(
      filter(res => !res && Boolean(user)),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(_ => this.draftsFacade.get());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
