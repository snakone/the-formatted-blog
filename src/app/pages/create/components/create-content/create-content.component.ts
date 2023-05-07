import { Component, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, tap } from 'rxjs';
import { QuillEditorComponent, QuillModules } from 'ngx-quill';
import { DeltaOperation, DeltaStatic } from 'quill';
import { EMPTY_QUILL, QUILL_CONTAINER } from '@shared/data/quills';
import { Post, PostHeader } from '@shared/types/interface.types';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { slugify } from '@core/services/quill/quill.module';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})

export class CreateContentComponent implements OnDestroy, AfterContentInit {

  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  draft!: Post;
  private unsubscribe$ = new Subject<void>();
  show = false;
  model = EMPTY_QUILL as DeltaStatic;
  timer = 1000;

  quillModules: QuillModules = {
    syntax: true,
    toolbar: {
      container: QUILL_CONTAINER,
      handlers: {
        'undo': () => this.editor.quillEditor.getModule('history').undo(),
        'redo': () => this.editor.quillEditor.getModule('history').redo(),
      }
    },
    imageCompress: {
      quality: 0.5,
      maxWidth: 600, 
      maxHeight: 350, 
      debug: false, 
    },
    history: { delay: 2000, userOnly: false },
  };

  constructor(private draftsFacade: DraftsFacade) { }

  ngAfterContentInit(): void {
    this.listenEditor();
    this.getActive();
  }

  private listenEditor(): void {
    this.editor.onContentChanged
     .pipe(
       takeUntil(this.unsubscribe$),
       filter(_ => _.source !== 'api'),
       distinctUntilChanged(),
       tap(_ => this.save(true)),
       debounceTime(this.timer),
       map(_ => _.content as DeltaStatic),
     )
     .subscribe((delta) => 
        this.onChange(delta, this.getHeaders(delta.ops))
      );
  }

  private getHeaders(ops: DeltaOperation[]): PostHeader[] {
    if (ops) {
      const headers = ops.map(
        (o: DeltaOperation, i) => {
          if (o.attributes?.header === 2) {
            const str = ops[i - 1].insert?.split('\n');
            const text =  str[str.length - 1];
            return {text, id: slugify(text)} as PostHeader;
          }

          return null;
        }
      ).filter(s => Boolean(s));
      return headers;
    }
    return [];
  }

  private onChange(
    delta: DeltaStatic,
    headers: PostHeader[]
  ): void {
    let temporalDraft: Post | undefined;

    !this.draft ? // NEW 
      (
        temporalDraft = { title: 'Boceto ', message: delta, headers },
        this.draftsFacade.create(temporalDraft)
      ) :  // UPDATE
      (
        temporalDraft = Object.assign({}, this.draft),
        temporalDraft.message = delta, 
        temporalDraft.headers = headers, 
        this.draftsFacade.update(temporalDraft)
      );

    this.draftsFacade.setPreview(temporalDraft);
    this.save(false);
    setTimeout(() => this.focusQuill(), 10);
  }

  private save(value: boolean): void {
    this.draftsFacade.setSaving({type: 'saving', value})
  }

  public clean(): void {
   this.editor.quillEditor.setContents(null);
  }

  private getActive(): void {
    this.draftsFacade.active$
    .pipe(
      takeUntil(this.unsubscribe$),
      tap(res => this.draft = res),
      debounceTime(10)
    )
     .subscribe(_ => this.focusQuill(true));
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

  private focusQuill(scroll = false): void {
    if (!this.draft) { return; }

    const text = this.editor.quillEditor?.getLength();
    if (text) {
      this.editor.quillEditor?.setSelection(text, text);
    }

    if (scroll) {
      const bounds = this.editor.quillEditor?.getBounds(text, text);
      const container = this.editor.quillEditor['container'];
      if (bounds && container) {
        container.scrollTop = bounds.top;
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.draftsFacade.resetPreview();
  }

}
