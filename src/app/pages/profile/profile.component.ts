import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LIKE_TOOLTIP } from '@shared/data/sentences';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent implements OnInit {

  tooltip = LIKE_TOOLTIP;

  constructor() { }

  ngOnInit(): void { }

  public like(): void {
    console.log('profile');
  }

}
