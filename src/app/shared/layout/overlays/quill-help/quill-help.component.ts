import { Component, ChangeDetectionStrategy } from '@angular/core';
import { QUILL_HELP_ITEMS_ACTIONS, QUILL_HELP_ITEMS_TOOLBAR } from '@shared/data/quills';

@Component({
  selector: 'app-quill-help',
  templateUrl: './quill-help.component.html',
  styleUrls: ['./quill-help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuillHelpDialogComponent {

  toolbarItems = QUILL_HELP_ITEMS_TOOLBAR;
  actionItems = QUILL_HELP_ITEMS_ACTIONS;

  constructor() { }

}
