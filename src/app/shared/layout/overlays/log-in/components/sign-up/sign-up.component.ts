import { 
  Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  EventEmitter, 
  Output 
} from '@angular/core';

import { 
  AbstractControl, 
  FormGroup, 
  FormControl, 
  Validators, 
  ValidatorFn, 
  ValidationErrors 
} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { UsersFacade } from '@core/ngrx/users/users.facade';
import { NamePattern } from '@shared/data/patterns';
import { User } from '@shared/types/interface.types';
import { LogInOverlayComponent } from '../../log-in.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;
  @Output() login = new EventEmitter<void>();
  matchError = false;
  namePattern = NamePattern;
  
  notify = false;
  conditions = false;

  constructor(
    public dialogRef: MatDialogRef<LogInOverlayComponent>,
    private userFcd: UsersFacade
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  get name(): AbstractControl | any { return this.signUpForm.get('name'); }
  get rol(): AbstractControl | any { return this.signUpForm.get('rol'); }
  get email(): AbstractControl | any { return this.signUpForm.get('email'); }
  get password(): AbstractControl | any { return this.signUpForm.get('password'); }
  get password2(): AbstractControl | any { return this.signUpForm.get('password2'); }

  private createSignInForm(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(this.namePattern)
      ]),
      email: new FormControl(null, [
         Validators.required,
         Validators.email,
         Validators.minLength(5),
         Validators.maxLength(35)
      ]),
      rol: new FormControl(null, [
        Validators.required,
        Validators.maxLength(35)
      ]),
      password: new FormControl(null, [
         Validators.required,
         Validators.minLength(5),
         Validators.maxLength(25)
      ]),
      password2: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        this.comparePassword()
     ])
    });

    // update password -> password2
  }

  public onSubmit(): void {
    if (this.signUpForm.invalid) { return; }
    const user: User = this.signUpForm.value;
    this.userFcd.register(user);
    this.dialogRef.close();
  }

  public signIn(): void {
    this.login.emit();
  }

  private comparePassword(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      const compare = this.signUpForm?.get('password')?.value;
      if (!value || !compare) { return null; }
      return value !== compare ? { passwordMatch: true } : null;
    }
  }

}
