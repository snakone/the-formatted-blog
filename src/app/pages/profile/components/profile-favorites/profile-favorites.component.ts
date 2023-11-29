import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.post';
import { SearchTypeEnum } from '@shared/types/types.enums';
import { Observable, debounceTime } from 'rxjs';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFavoritesComponent implements OnInit {

  favorites$: Observable<Post[]> | undefined;
  searchType = SearchTypeEnum;

  constructor(private postFacade: PostsFacade) { }

  ngOnInit(): void {
    this.favorites$ = this.postFacade.favorites$;
  }

  public getIdsFromPost(post: Post[]): string[] {
    return post.map(post => post._id);
  }

  ngOnDestroy(): void {
    this.postFacade.resetFilter();
  }

}
