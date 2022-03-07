import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ActionBarComponent implements OnInit {

  @Input() margin = false;
  @Input() tooltip!: string;
  @Input() buttonText!: string;
  @Input() function!: Function;

  constructor() { }

  ngOnInit(): void { }

}
