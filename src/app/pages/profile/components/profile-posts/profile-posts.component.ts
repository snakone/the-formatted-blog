import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.types';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePostsComponent implements OnInit {

  items$: Observable<Post[]>;
  favoritesID$: Observable<string[]> | undefined;

  constructor(private postFacade: PostsFacade) { }

  ngOnInit(): void {
    this.favoritesID$ = this.postFacade.favoritesID$;
    this.items$ = this.postFacade.byUser$
  }

  ngOnDestroy() {
    this.postFacade.resetFilter();
  }

}
