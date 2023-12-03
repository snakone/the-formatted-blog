import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@shared/types/interface.user';
import { SearchTypeEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-profile-friends-content',
  templateUrl: './profile-friends-content.component.html',
  styleUrls: ['./profile-friends-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileFriendsContentComponent {

  @Input() friends: User[] | undefined;
  searchType = SearchTypeEnum;

  constructor() { }

  ngOnInit() {}

}
