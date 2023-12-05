import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfileSettingsService } from '../../services/profile-settings.service';
import { UserSettings } from '@shared/types/class.types';

@Component({
  selector: 'app-profile-settings-content',
  templateUrl: './profile-settings-content.component.html',
  styleUrl: './profile-settings-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSettingsContentComponent {

  settings: UserSettings | undefined;

  constructor(private settingsSrv: ProfileSettingsService) {}

  ngOnInit() {
    this.settings = this.settingsSrv.settingsState();
  }

}
