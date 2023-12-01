import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UsersFacade } from '@store/users/users.facade';
import { USER_INDEX } from '@shared/data/data';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHeaderComponent {

  list = USER_INDEX;

  constructor(private userFcd: UsersFacade) { }

  ngOnInit(): void { }

  logOut(): void {
    this.userFcd.logOut();
  }

}
