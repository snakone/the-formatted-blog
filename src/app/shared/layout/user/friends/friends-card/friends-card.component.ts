import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PROFILE_ROUTE } from '@shared/data/constants';
import { STATS_LIST } from '@shared/data/data';
import { User } from '@shared/types/interface.user';

@Component({
  selector: 'app-friends-card',
  templateUrl: './friends-card.component.html',
  styleUrl: './friends-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FriendsCardComponent {

  @Input() friend: User | undefined;
  statsList = STATS_LIST;

  constructor(private router: Router) {}

  public goToProfile(id: string): void {
    this.router.navigateByUrl(PROFILE_ROUTE + '/' + id);
  }

}
