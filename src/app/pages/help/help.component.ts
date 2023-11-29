import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HELP_SENTENCE } from '@shared/data/sentences';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HelpComponent implements OnInit {

  text = HELP_SENTENCE;

  constructor() { }

  ngOnInit(): void { }

}
