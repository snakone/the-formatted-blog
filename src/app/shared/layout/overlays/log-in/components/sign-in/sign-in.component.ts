import { 
  Component, 
  ChangeDetectionStrategy, 
  Output, 
  EventEmitter, 
  Input
} from '@angular/core';

import { AbstractControl, FormGroup } from '@angular/forms';
import { UsersFacade } from '@store/users/users.facade';
import { LogInDialogComponent } from '../../log-in.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SignInForm } from '@shared/types/interface.form';

import { SIGN_IN_FORM } from '@shared/data/forms';
import { EMAIL_KEY, PASSWORD_KEY } from '@shared/data/constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent {

  @Output() register = new EventEmitter<void>();
  signInForm!: FormGroup<SignInForm>;

  @Input() set rememberEmail(value: string) {
    if (value && this.signInForm) { this.patchAndDirty(value); }
  };

  constructor(
    public dialogRef: MatDialogRef<LogInDialogComponent>,
    private userFcd: UsersFacade
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  private createSignInForm(): void {
    this.signInForm = SIGN_IN_FORM();
  }

  public onSubmit(): void {
    if (this.signInForm.invalid) { return; }
    const { email, password } = this.signInForm.value;
    this.userFcd.login(email, password);
    this.dialogRef.close();
  }

  public signUp(): void {
    this.register.emit();
  }

  public recover(): void {
    this.dialogRef.close();
  }

  private getControl(name: string): AbstractControl | null {
    return this.signInForm.get(name);
  }

  private patchAndDirty(value: string): void {
    this.signInForm.controls.email.patchValue(value);
    this.signInForm.controls.email.markAsDirty();
  }

  get email(): AbstractControl { return this.getControl(EMAIL_KEY); }
  get password(): AbstractControl { return this.getControl(PASSWORD_KEY); }

}


