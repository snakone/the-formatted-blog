import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConditionsComponent {

  text = NOTIFICATION_TEXT;
  duration = 1500;
  
  public notification(): void {
    console.log('home');
  }

}
