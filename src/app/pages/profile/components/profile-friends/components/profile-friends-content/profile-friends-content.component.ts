import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { STATS_LIST } from '@shared/data/data';
import { User } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-friends-content',
  templateUrl: './profile-friends-content.component.html',
  styleUrls: ['./profile-friends-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileFriendsContentComponent {

  @Input() friends: User[] | undefined;
  statsList = STATS_LIST;

  ngOnInit() {
    this.friends = Array(30).fill(this.friends[0]);
  }

}
