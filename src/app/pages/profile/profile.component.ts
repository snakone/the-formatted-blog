import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LIKE_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent {

  text = LIKE_TEXT;

  constructor() { }

  public like(): void {
    console.log('profile');
  }

}
