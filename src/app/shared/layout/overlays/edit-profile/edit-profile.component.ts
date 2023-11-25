import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { UserProfile } from '@shared/types/class.types';
import { EditProfileForm } from '@shared/types/interface.form';
import { User } from '@shared/types/interface.user';

import { EDIT_PROFILE_FORM } from '@shared/data/forms';
import { NAME_KEY, ROLE_KEY, BIO_KEY, TWITTER_KEY, GITHUB_KEY, PORTFOLIO_KEY } from '@shared/data/constants';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditProfileDialogComponent {

  editProfileForm: FormGroup<EditProfileForm>;
  controls = [NAME_KEY, ROLE_KEY, BIO_KEY, TWITTER_KEY, GITHUB_KEY, PORTFOLIO_KEY];

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
    this.editProfileForm = EDIT_PROFILE_FORM(this.data?.user);
  }

  private patchForm(): void {
    this.editProfileForm.markAsPristine();
    this.controls
     .filter(c => Boolean(this[c].value))
     .forEach(c => this[c].markAsDirty({onlySelf: true}));
  }

  public onSubmit(): void {
    if (this.editProfileForm.invalid) { return; }
    const { name, role, bio, twitter, github, portfolio } = this.editProfileForm.value;

    const profile: UserProfile = {
      bio,
      role,
      twitter,
      github,
      portfolio,
      location: this.data.user.profile.location
    };

    const updatedUser: User = {
      ...this.data.user,
      name,
      profile
    };

    this.userFacade.update(updatedUser);
    this.dialogRef.close();
  }

  private getControl(name: string): AbstractControl | null {
    return this.editProfileForm.get(name);
  }

  get name(): AbstractControl { return this.getControl(NAME_KEY); }
  get role(): AbstractControl { return this.getControl(ROLE_KEY); }
  get bio(): AbstractControl { return this.getControl(BIO_KEY); }
  get twitter(): AbstractControl { return this.getControl(TWITTER_KEY); }
  get github(): AbstractControl { return this.getControl(GITHUB_KEY); }
  get portfolio(): AbstractControl { return this.getControl(PORTFOLIO_KEY); }

}
