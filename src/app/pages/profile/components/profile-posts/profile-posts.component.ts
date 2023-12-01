import { Component, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UserService } from '@core/services/api/users.service';
import { Post } from '@shared/types/interface.post';
import { DraftTypeEnum, SearchTypeEnum } from '@shared/types/types.enums';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePostsComponent {

  items$: Observable<Post[]> = null;
  favoritesID$: Observable<string[]> | undefined;
  searchType = SearchTypeEnum;

  constructor(
    private postFacade: PostsFacade,
    private userSrv: UserService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.checkData();
    this.favoritesID$ = this.postFacade.favoritesID$;
    
    this.items$ = this.postFacade.filtered$.pipe(
      map(res => res.filter(post => post.type === DraftTypeEnum.POST))
    );
  }

  private checkData(): void {
    const user = this.userSrv.getUser();

    this.postFacade.byUserLoaded$
     .pipe(
       filter(res => !res && Boolean(user)),
       takeUntilDestroyed(this.destroyRef)
      )
     .subscribe(_ => this.postFacade.getByUser(user._id));
  }

  ngOnDestroy() {
    this.postFacade.resetFilter();
  }

}
