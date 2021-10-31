import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NOTIFICATION_TOOLTIP } from '@shared/data/data';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotificationBarComponent implements OnInit {

  @Input() margin = false;
  tooltip = NOTIFICATION_TOOLTIP;

  constructor() { }

  ngOnInit(): void { }

}
