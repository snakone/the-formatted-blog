import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UsersFacade } from '@store/users/users.facade';
import { LIKE_TEXT } from '@shared/data/sentences';
import { User } from '@shared/types/interface.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent implements OnInit {

  text = LIKE_TEXT;
  user$: Observable<User>;

  constructor(
    private userFcd: UsersFacade
  ) { }

  ngOnInit(): void {
    this.user$ = this.userFcd.user$;
  }

}
