import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFriendsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
