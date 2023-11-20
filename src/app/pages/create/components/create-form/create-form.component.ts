import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { filter, Subject, takeUntil, tap, distinctUntilChanged, debounceTime, startWith, map } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { EDIT_POST_CONFIRMATION, POST_CATEGORIES } from '@shared/data/data';
import { IMAGE_PATTERN } from '@shared/data/patterns';
import { Post } from '@shared/types/interface.post';
import { NavigationEnd, Router } from '@angular/router';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent implements OnInit {

  draftForm: UntypedFormGroup;
  private unsubscribe$ = new Subject<void>();
  categories = POST_CATEGORIES;
  emptyDraft: Post = {title: '', category: '', cover: '', intro: ''};
  url: string;
  draft: Post;
  controls = ['title', 'category', 'cover', 'intro'];
  timer = 5000;

  constructor(
    private draftsFacade: DraftsFacade,
    private crafter: CrafterService,
    private postFacade: PostsFacade
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getActive();
    this.listenValues();
  }

  private getActive(): void {
    this.draftsFacade.active$
     .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => !!_),
        tap(draft => this.draft = draft),
      )
    .subscribe(draft => this.patchForm(draft));
  }

  private createForm(): void {
    this.draftForm = new UntypedFormGroup({
       title: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(10)
       ]),
       category: new UntypedFormControl(null, [Validators.required]),
       cover: new UntypedFormControl(null, [
        Validators.required,
        Validators.pattern(IMAGE_PATTERN)
      ]),
      intro: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(150),
        Validators.maxLength(500)
      ]),
    });
  }

  private listenValues(): void {
    this.draftForm.valueChanges
     .pipe(
       takeUntil(this.unsubscribe$),
       filter(_ => this.draftForm.valid && !this.draftForm.pristine),
       distinctUntilChanged(),
       tap(_ => this.draftsFacade.setSaving({type: 'saving', value: true})),
       debounceTime(this.timer),
       tap(_ => this.draftsFacade.setSaving({type: 'saving', value: false}))
    )
     .subscribe(_ => this.submit());
  }

  private patchForm(draft: Post): void {
    this.draftForm.markAsPristine();
    this.draftForm.patchValue({...draft});
    this.controls.forEach(c => this[c].markAsDirty({onlySelf: true}));
  }

  public clean(): void {
    this.patchForm({...this.emptyDraft});
  }

  public submit(): void {
    if (this.draftForm.invalid) { 
      this.draftsFacade.setSaving({type: 'warning', value: true})
      return; 
    }
    const values = this.draftForm.value;
    const draft: Post = {...this.draft, ...values};

    // TEMPORAL - UNPUBLISH
    if (this.draft.temporal) {
      this.crafter.confirmation(EDIT_POST_CONFIRMATION)
      .afterClosed()
        .pipe(
          takeUntil(this.unsubscribe$),
          filter(_ => _ && !!_)
      ).subscribe(_ => this.postFacade.unPublish(draft));
    } else {
      this.draftsFacade.update(draft);
    }
  }

  get title(): AbstractControl { return this.draftForm.get('title') as AbstractControl; }
  get category(): AbstractControl { return this.draftForm.get('category') as AbstractControl; }
  get cover(): AbstractControl { return this.draftForm.get('cover') as AbstractControl; }
  get intro(): AbstractControl { return this.draftForm.get('intro') as AbstractControl; }

}
