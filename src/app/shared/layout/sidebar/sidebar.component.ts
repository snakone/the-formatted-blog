import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SidebarComponent implements OnInit {

  @Input() recent = true;
  @Input() categories = true;

  constructor() { }

  ngOnInit(): void { }

}
