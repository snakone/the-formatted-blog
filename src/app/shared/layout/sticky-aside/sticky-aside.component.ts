import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-aside',
  templateUrl: './sticky-aside.component.html',
  styleUrls: ['./sticky-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class StickyAsideComponent implements OnInit {

  @Input() selector: string | undefined;

  constructor() { }

  ngOnInit(): void {}

}
