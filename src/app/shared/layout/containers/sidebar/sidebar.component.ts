import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class SidebarComponent {

  @Input() recent = true;
  @Input() categories = true;

  constructor() { }

}
