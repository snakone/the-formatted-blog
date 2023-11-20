import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '@shared/types/interface.post';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

@Component({
  selector: 'app-profile-drafts',
  templateUrl: './profile-drafts.component.html',
  styleUrls: ['./profile-drafts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileDraftsComponent implements OnInit {

  drafts$!: Observable<Post[]>;
  favoritesID$: Observable<string[]> | undefined;

  constructor(private postFacade: PostsFacade) { }

  ngOnInit(): void {
    this.favoritesID$ = this.postFacade.favoritesID$;

    this.drafts$ = this.postFacade.filtered$.pipe(
      map(res => res.filter(post => post.type === 'draft'))
    );
  }

  ngOnDestroy(): void {
    this.postFacade.resetFilter();
  }

}
