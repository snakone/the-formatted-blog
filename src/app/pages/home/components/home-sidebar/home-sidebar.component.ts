import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
}


