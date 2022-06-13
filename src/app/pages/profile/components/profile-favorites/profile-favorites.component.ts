import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html',
  styleUrls: ['./profile-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFavoritesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
