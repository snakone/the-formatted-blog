import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { User } from '@shared/types/interface.user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ProfileFriendsComponent implements OnInit {

  friends$: Observable<User[]> | undefined;

  constructor(private userFacade: UsersFacade) { }

  ngOnInit(): void {
    this.friends$ = this.userFacade.friends$;
  }

}
