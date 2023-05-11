import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UsersFacade } from '@store/users/users.facade';
import { USER_INDEX } from '@shared/data/data';
import { User } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHeaderComponent implements OnInit {

  @Input() user: User;
  list = USER_INDEX;

  constructor(private userFcd: UsersFacade) { }

  ngOnInit(): void { }

  logOut(): void {
    this.userFcd.logOut();
  }

}
