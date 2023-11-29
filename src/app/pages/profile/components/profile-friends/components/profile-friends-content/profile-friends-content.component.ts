import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PROFILE_ROUTE } from '@shared/data/constants';
import { STATS_LIST } from '@shared/data/data';
import { User } from '@shared/types/interface.user';

@Component({
  selector: 'app-profile-friends-content',
  templateUrl: './profile-friends-content.component.html',
  styleUrls: ['./profile-friends-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileFriendsContentComponent {

  @Input() friends: User[] | undefined;
  statsList = STATS_LIST;

  constructor(private router: Router) { }

  ngOnInit() {
    this.friends = Array(30).fill(this.friends[0]);
  }

  public goToProfile(id: string): void {
    this.router.navigateByUrl(PROFILE_ROUTE + '/' + id);
  }

}
