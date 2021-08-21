import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
