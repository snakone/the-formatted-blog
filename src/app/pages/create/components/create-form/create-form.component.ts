import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DraftsFacade } from '@core/ngrx/drafts/drafts.facade';
import { POST_CATEGORIES } from '@shared/data/data';
import { IMAGE_PATTERN } from '@shared/data/patterns';
import { Post } from '@shared/types/interface.types';
import { filter, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent implements OnInit {

  draftForm: FormGroup;
  private unsubscribe$ = new Subject<void>();
  categories = POST_CATEGORIES;
  url: string;
  draft: Post;

  get title(): AbstractControl { return this.draftForm.get('title') as AbstractControl; }
  get category(): AbstractControl { return this.draftForm.get('category') as AbstractControl; }
  get cover(): AbstractControl { return this.draftForm.get('cover') as AbstractControl; }
  get intro(): AbstractControl { return this.draftForm.get('intro') as AbstractControl; }

  controls = ['title', 'category', 'cover', 'intro'];

  constructor(private draftsFacade: DraftsFacade) { }

  ngOnInit(): void {
    this.createForm();
    this.getActive();
  }

  private getActive(): void {
    this.draftsFacade.active$
     .pipe(
        takeUntil(this.unsubscribe$),
        filter(_ => _ && !!_),
        tap(draft => this.draft = draft),
      )
      .subscribe(draft => {
        this.draftForm.patchValue({...draft});
        this.controls.forEach(c => this[c].markAsDirty({onlySelf: true}))
      });
  }

  private createForm(): void {
    this.draftForm = new FormGroup({
       title: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
       ]),
       category: new FormControl(null, [Validators.required]),
       cover: new FormControl(null, [
        Validators.required,
        Validators.pattern(IMAGE_PATTERN)
      ]),
      intro: new FormControl(null, [
        Validators.required,
        Validators.minLength(100)
      ]),
    });
  }

  public submit(): void {
    const values = this.draftForm.value;
    const draft: Post = {...this.draft, ...values};
    this.draftsFacade.update(draft);
  }

}
