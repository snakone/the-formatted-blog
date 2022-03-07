import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogInOverlayComponent implements OnInit {

  register = false;

  constructor() { }

  ngOnInit(): void { }

}
