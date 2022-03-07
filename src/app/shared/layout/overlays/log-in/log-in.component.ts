import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogInOverlayComponent {

  register = false;

  constructor() { }

}
