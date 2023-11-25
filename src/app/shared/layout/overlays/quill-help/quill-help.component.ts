import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QUILL_HELP_ITEMS } from '@shared/data/quills';

@Component({
  selector: 'app-quill-help',
  templateUrl: './quill-help.component.html',
  styleUrls: ['./quill-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuillHelpComponent {

  items = QUILL_HELP_ITEMS;

  constructor() { }

}
