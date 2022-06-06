import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { Delta } from 'quill';

import { CrafterService } from '@services/crafter/crafter.service';
import { CREATE_ACTION_LIST, DUMMY_POST } from '@shared/data/data';
import { EMPTY_QUILL } from '@shared/data/quills';
import { QuillHelpComponent } from '@layout/overlays/quill-help/quill-help.component';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateContentComponent implements OnInit, OnDestroy {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  model!: Delta;
  post = DUMMY_POST[0];
  saving$ = new BehaviorSubject<boolean>(false);
  private unsubscribe$ = new Subject<void>();
  list = CREATE_ACTION_LIST;
  show = false;

  switchObj: any = {
    new: () => null,
    archive: () => null,
    delete: () => this.model = EMPTY_QUILL as Delta,
    help: () => this.openHelp(),
    next: () => this.next()
  };

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

  constructor(private crafter: CrafterService) { }

  ngOnInit(): void {
    this.editor.onContentChanged
     .pipe(
       tap(_ => this.saving$.next(true)),
       debounceTime(5000),
       distinctUntilChanged(),
       takeUntil(this.unsubscribe$)
     )
     .subscribe(_ => this.saving$.next(false));
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

  public action(v: string): void {
    this.switchObj[v]();
  }

  public ready(e: any): void {
    console.log(e);
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

}
