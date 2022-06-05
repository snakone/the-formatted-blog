import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { Delta } from 'quill';

import { CrafterService } from '@services/crafter/crafter.service';
import { CREATE_ACTION_LIST, DUMMY_POST } from '@shared/data/data';
import { EMPTY_QUILL } from '@shared/data/quills';
import { QuillHelpComponent } from '@layout/overlays/quill-help/quill-help.component';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})

export class CreateContentComponent implements OnInit, OnDestroy {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  model!: Delta;
  post = DUMMY_POST[0];
  saving = false;
  private unsubscribe$ = new Subject<void>();
  list = CREATE_ACTION_LIST;

  constructor(private crafter: CrafterService) { }

  ngOnInit(): void {
    this.editor.onContentChanged
     .pipe(
       tap(_ => this.saving = true),
       debounceTime(3000),
       distinctUntilChanged(),
       takeUntil(this.unsubscribe$)
     )
     .subscribe(_ => this.saving = false);
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

  public action(v: string): void {
    switch(v) {
      case 'new': null;
        break;
      case 'archive': null;
        break;
      case 'delete': this.model = EMPTY_QUILL as Delta;
        break;
      case 'help': this.openHelp();
        break;
      case 'next': this.next();
    }
  }

  private openHelp(): void {
    this.crafter.dialog(QuillHelpComponent, null, '', 'quill-help');
  }

  private next(): void {
    console.log(this.model);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  quillModules: QuillModules = {
    syntax: true,
    toolbar: {
      container: [
        ['bold'],
        ['blockquote', 'code-block'],
        [{ 'header': 2 }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['undo' , 'redo'],
        ['link', 'image', 'video'],
      ],
      handlers: {
        'undo': () => this.editor.quillEditor.getModule('history').undo(),
        'redo': () => this.editor.quillEditor.getModule('history').redo(),
      }
    },
    history: {
      delay: 2000,
      userOnly: true
    },
  };

}
