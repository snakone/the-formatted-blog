import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { EditProfileDialogComponent } from '@shared/layout/overlays/edit-profile/edit-profile.component';
import { Post, User } from '@shared/types/interface.types';
import { Observable, map, tap } from 'rxjs';

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

  constructor(private crafter: CrafterService, private postFacade: PostsFacade, private userFacade: UsersFacade) { }

  ngOnInit() {
    this.recentPost$ = this.postFacade.byUser$;
  }

  ngAfterViewInit() {
    if (this.isPublic) {
      this.postFacade.getByUser(this.user._id);
    }
  }

  public edit(): void {
    this.crafter.dialog(EditProfileDialogComponent, {user: this.user}, null, 'edit-profile')
  }

  public addFriend(): void {
    this.userFacade.addFriend(this.user);
  }

}
