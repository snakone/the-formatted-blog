import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.types';
import { Observable, Subject, filter, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFavoritesComponent implements OnInit {

  favorites$: Observable<Post[]> | undefined;
  private unsubscribe$ = new Subject<void>();
  favoritesID$: Observable<string[]> | undefined;

  constructor(private postFacade: PostsFacade, private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.checkDraftData();
    this.favoritesID$ = this.postFacade.favoritesID$;

    this.favorites$ = this.postFacade.favoritesID$.pipe(
      switchMap(ids => this.postFacade.filtered$.pipe(
        map(res => res.filter(post => ids.includes(post?._id))))
      )
    );
  }

  private checkDraftData(): void {
    this.draftsFacade.loaded$
     .pipe(
       filter(res => !res),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.draftsFacade.get());
  }

  // private checkPostData(): void {
  //   this.postFacade.loaded$
  //    .pipe(
  //      filter(res => !res),
  //      takeUntil(this.unsubscribe$)
  //     )
  //    .subscribe(_ => this.postFacade.get());
  // }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.postFacade.resetFilter();
  }

}
