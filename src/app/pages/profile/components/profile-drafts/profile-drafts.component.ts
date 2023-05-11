import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, filter, takeUntil } from 'rxjs';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-drafts',
  templateUrl: './profile-drafts.component.html',
  styleUrls: ['./profile-drafts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileDraftsComponent implements OnInit {

  drafts$!: Observable<Post[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.checkData();
    this.drafts$ = this.draftsFacade.filtered$;
  }

  private checkData(): void {
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
    this.draftsFacade.resetFilter();
  }

}
