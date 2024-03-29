import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SectionComponent {

  @Input() margin = true;
  @Input() collapsed = false;

  constructor() { }

}
