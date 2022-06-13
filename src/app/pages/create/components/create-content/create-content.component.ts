import { Component, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, tap } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { Delta } from 'quill';

import { EMPTY_QUILL, QUILL_CONTAINER } from '@shared/data/quills';
import { Post } from '@shared/types/interface.types';
import { DraftsFacade } from '@store/drafts/drafts.facade';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})

export class CreateContentComponent implements OnDestroy, AfterContentInit {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  draft: Post;
  private unsubscribe$ = new Subject<void>();
  show = false;
  model = EMPTY_QUILL as Delta;

  quillModules: QuillModules = {
    syntax: true,
    toolbar: {
      container: QUILL_CONTAINER,
      handlers: {
        'undo': () => this.editor.quillEditor.getModule('history').undo(),
        'redo': () => this.editor.quillEditor.getModule('history').redo(),
      }
    },
    history: { delay: 2000, userOnly: true },
  };

  constructor(private draftsFacade: DraftsFacade) { }

  ngAfterContentInit(): void {
    this.listenEditor();
    this.getActive();
    // console.log(this.editor.quillEditor.root.innerHTML);
  }

  private listenEditor(): void {
    this.editor.onContentChanged
     .pipe(
       takeUntil(this.unsubscribe$),
       filter(_ => _.source !== 'api'),
       distinctUntilChanged(),
       tap(_ => this.draftsFacade.setSaving(true)),
       debounceTime(5000),
       tap(_ => this.draftsFacade.setSaving(false)),
       map(_ => _.content as Delta)
     )
     .subscribe((message: Delta) => this.onChange(message));
  }

  private getActive(): void {
    this.draftsFacade.active$
    .pipe(takeUntil(this.unsubscribe$))
     .subscribe(res => this.draft = res);
  }

  private onChange(message: Delta): void {
    !this.draft ? // NEW 
      (
        this.draft = { title: 'Boceto ', message },
        this.draftsFacade.create(this.draft)
      ) :  // UPDATE
    this.draftsFacade.updateKey(
      this.draft._id, { key: 'message', value: message }
    );
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
