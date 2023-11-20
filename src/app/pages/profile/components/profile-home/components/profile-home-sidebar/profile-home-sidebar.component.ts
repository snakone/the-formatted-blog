import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { REMOVE_FRIEND_CONFIRMATION, SOCIAL_LIST, STATS_LIST } from '@shared/data/data';
import { EditProfileDialogComponent } from '@shared/layout/overlays/edit-profile/edit-profile.component';
import { Post, User } from '@shared/types/interface.types';
import { Observable, Subject, filter, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-profile-home-sidebar',
  templateUrl: './profile-home-sidebar.component.html',
  styleUrls: ['./profile-home-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHomeSidebarComponent {

  @Input() user: User | undefined;
  @Input() isPublic: boolean = false;
  @Input() selector: string;

  recentPost$: Observable<Post[]> | undefined;
  friends$: Observable<User[]> | undefined;

  statsList = STATS_LIST;
  socialList = SOCIAL_LIST;
  private unsubscribe$ = new Subject<void>();

  constructor(private crafter: CrafterService, private postFacade: PostsFacade, private userFacade: UsersFacade) { }

  ngOnInit() {
    this.recentPost$ = this.postFacade.byUser$;
    this.friends$ = this.userFacade.friends$;
  }

  ngAfterViewInit() {
    if (this.isPublic) {
      this.postFacade.getByUser(this.user._id);
    }
  }

  public edit(): void {
    this.crafter.dialog(EditProfileDialogComponent, {user: this.user}, null, 'edit-profile')
  }

  public isUserMyFriend(friends: User[]): boolean {
    return friends.map(f => f._id).includes(this.user?._id);
  }

  public removeFriend(): void {
    this.crafter.confirmation(REMOVE_FRIEND_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_)
      ).subscribe(_ =>     this.userFacade.removeFriend(this.user._id));
  }

  public addFriend(): void {
    this.userFacade.addFriend(this.user);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
