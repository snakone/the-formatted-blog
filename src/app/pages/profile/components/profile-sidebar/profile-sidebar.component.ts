import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { USER_INDEX } from '@shared/data/data';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSidebarComponent implements OnInit {

  list = USER_INDEX;

  constructor(private userFcd: UsersFacade) { }

  ngOnInit(): void { }

  logOut(): void {
    this.userFcd.logOut();
  }

}
