import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActionBarComponent {

  @Input() margin = false;
  @Input() text!: string;
  @Input() buttonText!: string;
  @Input() function!: Function;

  constructor() { }

}
