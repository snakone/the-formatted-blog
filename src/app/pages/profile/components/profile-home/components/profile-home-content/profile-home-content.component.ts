import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User, UserActivity } from '@shared/types/interface.user';
import { DraftTypeEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-profile-home-content',
  templateUrl: './profile-home-content.component.html',
  styleUrls: ['./profile-home-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileHomeContentComponent {

  @Input() user: User | undefined;
  @Input() activities: UserActivity[] | undefined;

  constructor() {}

  public canVisit(activity: UserActivity): boolean {
    if (!activity.route) { return false; }
    if (
      activity.route === DraftTypeEnum.POST || 
      activity.route === DraftTypeEnum.DRAFT && 
      activity.user === this.user?._id
    ) {
      return true;
    }

    return false;
  }

}
