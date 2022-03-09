import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PWAService } from '@core/services/pwa/pwa.service';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  text = NOTIFICATION_TEXT;

  constructor(private swPush: PWAService) { }

  public notification(): void {
    this.swPush.requestNotification();
  }

}
