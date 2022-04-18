import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HELP_QUILL } from '@shared/data/quills';
import { Delta } from 'quill';

@Component({
  selector: 'app-quill-help',
  templateUrl: './quill-help.component.html',
  styleUrls: ['./quill-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuillHelpComponent implements OnInit {

  model!: Delta;

  constructor() { }

  ngOnInit(): void {
    this.model = HELP_QUILL as Delta;
  }

}
