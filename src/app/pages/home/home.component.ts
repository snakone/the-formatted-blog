import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NOTIFICATION_TOOLTIP } from '@shared/data/sentences';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

  tooltip = NOTIFICATION_TOOLTIP;

  constructor() { }

  ngOnInit(): void { }

  public notification(): void {
    console.log('home');
  }

}
