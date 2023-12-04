import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSettingsComponent {

  text = NOTIFICATION_TEXT;

  constructor() { }

  public notification(): void {
    console.log('home');
  }

}
