import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-push-denied',
  templateUrl: './push-denied.component.html',
  styleUrls: ['./push-denied.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PushDeniedOverlayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
