import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() function = new EventEmitter<void>();

  constructor() { }

  public action(): void {
    this.function.emit();
  }

}
