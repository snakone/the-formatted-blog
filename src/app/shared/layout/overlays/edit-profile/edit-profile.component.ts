import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { URL_PATTERN } from '@shared/data/patterns';
import { User } from '@shared/types/interface.types';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditProfileDialogComponent {

  form: FormGroup;
  urlPattern = URL_PATTERN;
  controls = ['name', 'role', 'bio', 'twitter', 'github', 'portfolio'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
    private userFacade: UsersFacade,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>
  ) { }

  ngOnInit() {
    this.createEditForm();
    this.patchForm();
  }

  private createEditForm(): void {
    this.form = new FormGroup({
      name: new FormControl(
        this.data?.user.name || null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-ZáéíóúüñçÁÉÍÓÚÜÑÇ][a-zA-ZáéíóúüñçÁÉÍÓÚÜÑÇ\s]*[a-zA-ZáéíóúüñçÁÉÍÓÚÜÑÇ]$/)
        ]
      ),
      role: new FormControl(
        this.data?.user.profile.role || null, [
          Validators.maxLength(35)
        ]
      ),
      bio: new FormControl(
        this.data?.user.profile.bio || null, [
          Validators.minLength(50)
        ]
      ),
      twitter: new FormControl(
        this.data?.user.profile.twitter || null,
        [Validators.pattern(this.urlPattern)]
      ),
      github: new FormControl(
        this.data?.user.profile.github || null,
        [Validators.pattern(this.urlPattern)]
      ),
      portfolio: new FormControl(
        this.data?.user.profile.portfolio || null,
        [Validators.pattern(this.urlPattern)]
      )
    });
  }

  private patchForm(): void {
    this.form.markAsPristine();
    this.controls.forEach(c => this[c].markAsDirty({onlySelf: true}));
  }

  public onSubmit(): void {
    if (this.form.invalid) { return; }
    const { name, role, bio, twitter, github, portfolio } = this.form.value;
    this.data.user.profile = { bio, role, twitter, github, portfolio, location: this.data.user.profile.location};
    this.data.user.name = name;

    this.userFacade.update(this.data.user);
    this.dialogRef.close();
  }

  get name(): AbstractControl { return this.form.get('name') as AbstractControl; }
  get role(): AbstractControl { return this.form.get('role') as AbstractControl; }
  get bio(): AbstractControl { return this.form.get('bio') as AbstractControl; }
  get twitter(): AbstractControl { return this.form.get('twitter') as AbstractControl; }
  get github(): AbstractControl { return this.form.get('github') as AbstractControl; }
  get portfolio(): AbstractControl { return this.form.get('portfolio') as AbstractControl; }

}
