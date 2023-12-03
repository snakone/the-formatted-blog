import { Component, DestroyRef } from '@angular/core';
import { AbstractControl, FormGroup} from '@angular/forms';
import { filter, tap, distinctUntilChanged, debounceTime, withLatestFrom } from 'rxjs';

import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Post } from '@shared/types/interface.post';
import { CrafterService } from '@core/services/crafter/crafter.service';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';

import { SavingDraftType, SavingTypeEnum } from '@shared/types/types.enums';
import { CATEGORY_KEY, COVER_KEY, INTRO_KEY, TITLE_KEY } from '@shared/data/constants';
import { POST_CATEGORIES } from '@shared/data/data';
import { CREATE_DRAFT_FORM } from '@shared/data/forms';
import { CreateDraftForm } from '@shared/types/interface.form';
import { EDIT_POST_CONFIRMATION } from '@shared/data/dialogs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateDraftService } from '@pages/create/services/create-draft.service';

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
  isTemporal = false;

  constructor(
    private draftsFacade: DraftsFacade,
    private crafter: CrafterService,
    private postFacade: PostsFacade,
    private destroyRef: DestroyRef,
    private createDraftSrv: CreateDraftService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getActive();
    this.listenValues();
    this.listenToTemporalSave();
  }

  private getActive(): void {
    this.draftsFacade.active$
     .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean),
        tap(draft => (this.draft = draft, this.checkIfTemporal())),
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
       withLatestFrom(this.draftsFacade.saving$),
       tap(([_, saving]) => (!saving?.value && !this.isTemporal) ? this.save(true) : null),
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
      this.save(true, SavingTypeEnum.WARNING)
      return; 
    }

    if (this.draft.temporal) { return; }

    const values = this.draftForm.value;
    const draft: Post = {...this.draft, ...values};
    this.draftsFacade.update(draft);
    this.save(false);
  }

  private showTemporalDialog(): void {
    const values = this.draftForm.value;
    const draft: Post = {...this.draft, ...values};

    this.crafter.confirmation(EDIT_POST_CONFIRMATION)
    .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(Boolean)
    ).subscribe(_ => this.postFacade.unPublish(draft));
  }

  private checkIfTemporal(): void {
    if (this.draft.temporal) {
      this.isTemporal = true;
      this.save(false, SavingTypeEnum.TEMPORAL);
    } else {
      this.save(false, null);
      this.isTemporal = false;
    }
  }

  private save(
    value: boolean, 
    type: SavingDraftType | 
          SavingTypeEnum.TEMPORAL = SavingTypeEnum.SAVING
  ): void {
    this.draftsFacade.setSaving({type, value})
  }

  private listenToTemporalSave(): void {
    this.createDraftSrv.onSaveTemportal$
     .pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(id => 
        Boolean(id) && 
        id === this.draft._id && 
        Boolean(this.draft.temporal)
      ))
     .subscribe(_ => this.showTemporalDialog())
  }

  private getControl(name: string): AbstractControl | null {
    return this.draftForm?.get(name);
  }

  get title(): AbstractControl { return this.getControl(TITLE_KEY); }
  get category(): AbstractControl { return this.getControl(CATEGORY_KEY); }
  get cover(): AbstractControl { return this.getControl(COVER_KEY); }
  get intro(): AbstractControl { return this.getControl(INTRO_KEY); }

}
