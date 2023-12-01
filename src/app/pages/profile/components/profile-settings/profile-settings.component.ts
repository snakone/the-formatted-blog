import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileSettingsComponent {

  constructor() { }

  ngOnInit(): void {
  }

}
