import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
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
  recentPost$: Observable<Post[]> | undefined;

  constructor(private crafter: CrafterService, private postFacade: PostsFacade) { }

  ngOnInit() {
    this.recentPost$ = this.postFacade.byUser$;
  }

  public edit(): void {
    this.crafter.dialog(EditProfileDialogComponent, {user: this.user}, null, 'edit-profile')
  }

}
