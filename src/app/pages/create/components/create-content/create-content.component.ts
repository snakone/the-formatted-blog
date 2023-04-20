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
  draft: Post;
  private unsubscribe$ = new Subject<void>();
  show = false;
  model = EMPTY_QUILL as DeltaStatic;

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
    // focus: {
    //   focusClass: 'focused-blot'
    // },
    history: { delay: 2000, userOnly: false },
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
       tap(_ => this.save(true)),
       debounceTime(5000),
       map(_ => _.content as DeltaStatic),
     )
     .subscribe((message) => 
        this.onChange(message, this.getHeaders(message.ops))
      );
  }

  private getHeaders(ops: DeltaOperation[]): PostHeader[] {
    if (ops) {
      const headers = ops.map(
        (o: DeltaOperation, i) => {
          if (o.attributes?.header === 2) {
            const str = ops[i - 1].insert?.split('\n');
            const text =  str[str.length - 1];
            return {text, id: slugify(text)};
          }

          return null;
        }
      ).filter(s => Boolean(s));
      return headers;
    }
    return [];
  }

  private onChange(
    message: DeltaStatic,
    headers: PostHeader[]
  ): void {
    !this.draft ? // NEW 
      (
        this.draft = { title: 'Boceto ', message, headers },
        this.draftsFacade.create(this.draft)
      ) :  // UPDATE
      (
        this.draft.message = message, 
        this.draft.headers = headers, 
        this.draftsFacade.update(this.draft)
      );

    this.save(false);
  }

  private save(value: boolean): void {
    this.draftsFacade.setSaving({type: 'saving', value})
  }

  public clean(): void {
   this.editor.quillEditor.setContents(null);
  }

  private getActive(): void {
    this.draftsFacade.active$
    .pipe(takeUntil(this.unsubscribe$))
     .subscribe(res => this.draft = res);
  }

  public stickyFix(): void {
    window.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
