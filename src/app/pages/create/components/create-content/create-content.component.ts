import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { DUMMY_POST } from '@shared/data/data';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { Delta } from 'quill';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';

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

  constructor() { }

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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
