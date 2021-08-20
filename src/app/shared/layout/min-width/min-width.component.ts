import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NO_WIDTH } from '@shared/data/data';

@Component({
  selector: 'app-min-width',
  templateUrl: './min-width.component.html',
  styleUrls: ['./min-width.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MinWidthComponent {

  sentence = NO_WIDTH;

  constructor() { }

}
