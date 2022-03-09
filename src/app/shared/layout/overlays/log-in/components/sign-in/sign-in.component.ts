import { 
  Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  Output, 
  EventEmitter 
} from '@angular/core';

import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { UsersFacade } from '@core/ngrx/users/users.facade';
import { LogInOverlayComponent } from '../../log-in.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  remember = false;
  @Output() register = new EventEmitter<void>();

  get email(): AbstractControl { return this.signInForm.get('email') as AbstractControl; }
  get password(): AbstractControl { return this.signInForm.get('password') as AbstractControl; }

  constructor(
    public dialogRef: MatDialogRef<LogInOverlayComponent>,
    private userFcd: UsersFacade
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  private createSignInForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [
         Validators.required,
         Validators.email,
         Validators.minLength(5),
         Validators.maxLength(35)
      ]),
      password: new FormControl(null, [
         Validators.required,
         Validators.minLength(5),
         Validators.maxLength(25)
      ])
    });
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

}