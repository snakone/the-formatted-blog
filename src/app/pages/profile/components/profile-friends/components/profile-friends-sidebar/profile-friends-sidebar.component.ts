import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@shared/types/interface.user';

@Component({
  selector: 'app-profile-friends-sidebar',
  templateUrl: './profile-friends-sidebar.component.html',
  styleUrls: ['./profile-friends-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFriendsSidebarComponent {

  @Input() friends: User[] | undefined;

}
