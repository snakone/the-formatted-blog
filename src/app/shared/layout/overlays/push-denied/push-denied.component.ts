import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-push-denied',
  templateUrl: './push-denied.component.html',
  styleUrls: ['./push-denied.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PushDeniedDialogComponent {

  constructor() { }

}
