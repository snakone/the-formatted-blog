import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { filter, Subject, takeUntil, tap, distinctUntilChanged, debounceTime } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { POST_CATEGORIES } from '@shared/data/data';
import { IMAGE_PATTERN } from '@shared/data/patterns';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent implements OnInit {

  draftForm: UntypedFormGroup;
  private unsubscribe$ = new Subject<void>();
  categories = POST_CATEGORIES;
  url: string;
  draft: Post;
  controls = ['title', 'category', 'cover', 'intro'];

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.createForm();
    this.getActive();
    this.listenValues();
  }

  private getActive(): void {
    this.draftsFacade.active$
     .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_),
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
       debounceTime(5000),
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
    this.patchForm({title: '', category: '', cover: '', intro: ''});
  }

  public submit(): void {
    if (this.draftForm.invalid) { 
      this.draftsFacade.setSaving({type: 'warning', value: true})
      return; 
    }
    const values = this.draftForm.value;
    const draft: Post = {...this.draft, ...values};
    this.draftsFacade.update(draft);
  }

  get title(): AbstractControl { return this.draftForm.get('title') as AbstractControl; }
  get category(): AbstractControl { return this.draftForm.get('category') as AbstractControl; }
  get cover(): AbstractControl { return this.draftForm.get('cover') as AbstractControl; }
  get intro(): AbstractControl { return this.draftForm.get('intro') as AbstractControl; }

}
