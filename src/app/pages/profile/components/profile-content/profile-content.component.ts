import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersFacade } from '@core/ngrx/users/users.facade';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileContentComponent implements OnInit {

  constructor(private userFcd: UsersFacade) { }

  ngOnInit(): void { }

  logOut(): void {
    this.userFcd.logOut();
  }

}
