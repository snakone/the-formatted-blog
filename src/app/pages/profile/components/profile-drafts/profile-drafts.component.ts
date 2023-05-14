import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.types';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

@Component({
  selector: 'app-profile-drafts',
  templateUrl: './profile-drafts.component.html',
  styleUrls: ['./profile-drafts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileDraftsComponent implements OnInit {

  drafts$!: Observable<Post[]>;
  private unsubscribe$ = new Subject<void>();
  favoritesID$: Observable<string[]> | undefined;

  constructor(private draftsFacade: DraftsFacade, private postFacade: PostsFacade) { }

  ngOnInit(): void {
    this.checkData();
    this.favoritesID$ = this.postFacade.favoritesID$;

    this.drafts$ = this.postFacade.filtered$.pipe(
      map(res => res.filter(post => post.type === 'draft'))
    );
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
    this.postFacade.resetFilter();
  }

}
