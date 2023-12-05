import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HELP_SENTENCE, NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSettingsComponent {

  text = HELP_SENTENCE;

  constructor() { }

  public notification(): void {
    console.log('home');
  }

}
