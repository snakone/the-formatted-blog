import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-aside',
  templateUrl: './sticky-aside.component.html',
  styleUrls: ['./sticky-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StickyAsideComponent {

  @Input() selector: string | undefined;

  constructor() { }

}
