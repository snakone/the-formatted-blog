import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { User } from '@shared/types/interface.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileHomeComponent implements OnInit {

  user$: Observable<User> | undefined;

  constructor(private userFacade: UsersFacade) { }

  ngOnInit(): void {
    this.user$ = this.userFacade.user$;
  }



}
