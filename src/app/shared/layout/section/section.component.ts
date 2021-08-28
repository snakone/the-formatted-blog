import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SectionComponent implements OnInit {

  @Input() margin = true;

  constructor() { }

  ngOnInit(): void {
  }

}
