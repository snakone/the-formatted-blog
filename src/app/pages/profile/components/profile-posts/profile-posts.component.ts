import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UserService } from '@core/services/api/users.service';
import { Post } from '@shared/types/interface.types';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePostsComponent implements OnInit {

  items$: Observable<Post[]>;
  favoritesID$: Observable<string[]> | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(private postFacade: PostsFacade, private userSrv: UserService) { }

  ngOnInit(): void {
    this.checkData();
    this.favoritesID$ = this.postFacade.favoritesID$;
    this.items$ = this.postFacade.byUser$
  }

  private checkData(): void {
    this.postFacade.byUserLoaded$
     .pipe(
       filter(res => !res && !!this.userSrv.getUser()),
       takeUntil(this.unsubscribe$)
      )
     .subscribe(_ => this.postFacade.getByUser(this.userSrv.getUser()?._id));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.postFacade.resetFilter();
  }



}
