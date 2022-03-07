import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  text = NOTIFICATION_TEXT;

  constructor() { }

  public notification(): void {
    console.log('home');
  }

}
