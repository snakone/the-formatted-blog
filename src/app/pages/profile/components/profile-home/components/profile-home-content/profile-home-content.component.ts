import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserService } from '@core/services/api/users.service';
import { User, UserActivity } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-home-content',
  templateUrl: './profile-home-content.component.html',
  styleUrls: ['./profile-home-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHomeContentComponent {

  @Input() user: User | undefined;
  @Input() activities: UserActivity[] | undefined;

  constructor(private userSrv: UserService) {}

  public canVisit(activity: UserActivity): boolean {
    if (!activity.route) { return false; }
    if (
      activity.route === 'post' || 
      activity.route === 'draft' && 
      activity.user === this.userSrv.getUser()?._id
    ) {
      return true;
    }

    return false;
  }

}
