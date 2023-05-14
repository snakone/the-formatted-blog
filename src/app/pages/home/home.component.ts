import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PWAService } from '@core/services/pwa/pwa.service';
import { UserService } from '@core/services/api/users.service';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { LOGIN_FIRST_SENTENCE, NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class HomeComponent {

  text = NOTIFICATION_TEXT;

  constructor(
    private swPush: PWAService,
    private userService: UserService,
    private crafter: CrafterService
  ) { }

  public notification(): void {
    this.userService.getUser() ? 
    this.swPush.requestNotification() :
    this.crafter.setSnack(LOGIN_FIRST_SENTENCE, 'warning');
  }

  ngOnInit() { }

}
