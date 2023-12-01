import { Component, DestroyRef } from '@angular/core';
import { AbstractControl, FormGroup} from '@angular/forms';
import { filter, tap, distinctUntilChanged, debounceTime } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.post';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

import { SavingTypeEnum } from '@shared/types/types.enums';
import { CATEGORY_KEY, COVER_KEY, INTRO_KEY, TITLE_KEY } from '@shared/data/constants';
import { POST_CATEGORIES } from '@shared/data/data';
import { CREATE_DRAFT_FORM } from '@shared/data/forms';
import { CreateDraftForm } from '@shared/types/interface.form';
import { EDIT_POST_CONFIRMATION } from '@shared/data/dialogs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const timer = 5000;

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})

export class CreateFormComponent {

  draftForm: FormGroup<CreateDraftForm>;
  categories = POST_CATEGORIES;
  url: string;
  draft: Post;
  controls = [TITLE_KEY, CATEGORY_KEY, COVER_KEY, INTRO_KEY];

  constructor(
    private draftsFacade: DraftsFacade,
    private crafter: CrafterService,
    private postFacade: PostsFacade,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getActive();
    this.listenValues();
  }

  private getActive(): void {
    this.draftsFacade.active$
     .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(draft => this.draft = draft),
      )
    .subscribe(draft => this.patchForm(draft));
  }

  private createForm(): void {
    this.draftForm = CREATE_DRAFT_FORM();
  }

  private listenValues(): void {
    this.draftForm.valueChanges
     .pipe(
       takeUntilDestroyed(this.destroyRef),
       distinctUntilChanged(),
       filter(_ => this.draftForm.valid && !this.draftForm.pristine),
       tap(_ => this.draftsFacade.setSaving({type: SavingTypeEnum.SAVING, value: true})),
       debounceTime(timer),
    )
     .subscribe(_ => this.submit());
  }

  private patchForm(draft: Post): void {
    this.draftForm.markAsPristine();
    this.draftForm.patchValue({...draft});
    this.controls.filter(c => Boolean(this[c].value))
                 .forEach(c => this[c].markAsDirty({onlySelf: true}));
  }

  public clean(): void {
    this.createForm();
    this.controls.forEach(c => this[c].markAsDirty({onlySelf: true}));
  }

  public submit(): void {
    if (this.draftForm.invalid) { 
      this.draftsFacade.setSaving({type: SavingTypeEnum.WARNING, value: true})
      return; 
    }

    const values = this.draftForm.value;
    const draft: Post = {...this.draft, ...values};

    if (this.draft.temporal) {
      this.crafter.confirmation(EDIT_POST_CONFIRMATION)
      .afterClosed()
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          filter(Boolean)
      ).subscribe(_ => this.postFacade.unPublish(draft));
    } else {
      this.draftsFacade.update(draft);
    }

    this.draftsFacade.setSaving({type: SavingTypeEnum.SAVING, value: false})
  }

  private getControl(name: string): AbstractControl | null {
    return this.draftForm?.get(name);
  }

  get title(): AbstractControl { return this.getControl(TITLE_KEY); }
  get category(): AbstractControl { return this.getControl(CATEGORY_KEY); }
  get cover(): AbstractControl { return this.getControl(COVER_KEY); }
  get intro(): AbstractControl { return this.getControl(INTRO_KEY); }

}
