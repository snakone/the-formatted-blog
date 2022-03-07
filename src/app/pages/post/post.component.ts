import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NOTIFICATION_TOOLTIP } from '@shared/data/sentences';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent implements OnInit {

  tooltip = NOTIFICATION_TOOLTIP;

  constructor() { }

  ngOnInit(): void { }

  public notification(): void {
    console.log('home');
  }

}
