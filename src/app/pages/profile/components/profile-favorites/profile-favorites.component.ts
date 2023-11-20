import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.post';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFavoritesComponent implements OnInit {

  favorites$: Observable<Post[]> | undefined;
  favoritesID$: Observable<string[]> | undefined;

  constructor(private postFacade: PostsFacade) { }

  ngOnInit(): void {
    this.favoritesID$ = this.postFacade.favoritesID$;

    this.favorites$ = this.postFacade.favoritesID$.pipe(
      switchMap(ids => this.postFacade.filtered$.pipe(
        map(res => res.filter(post => ids.includes(post?._id))))
      )
    );
  }

  ngOnDestroy(): void {
    this.postFacade.resetFilter();
  }

}
