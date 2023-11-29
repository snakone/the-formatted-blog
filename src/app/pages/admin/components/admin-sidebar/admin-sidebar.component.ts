import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
