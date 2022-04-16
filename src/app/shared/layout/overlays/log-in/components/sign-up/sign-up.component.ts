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

import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

import { UsersFacade } from '@core/ngrx/users/users.facade';
import { NamePattern } from '@shared/data/patterns';
import { User } from '@shared/types/interface.types';
import { LogInOverlayComponent } from '../../log-in.component';
import { PWAService } from '@core/services/pwa/pwa.service';

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
  private unsubscribe$ = new Subject<void>();
  
  notify = false;
  conditions = false;

  constructor(
    public dialogRef: MatDialogRef<LogInOverlayComponent>,
    private userFcd: UsersFacade,
    private pwaSrv: PWAService
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
    this.passwordMatch();
  }

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
  }

  public onSubmit(): void {
    if (this.signUpForm.invalid || !this.conditions) { return; }
    const user: User = { ...this.signUpForm.value };
    this.userFcd.register(user);
    
    if (this.notify) {
      setTimeout(() => {
        this.pwaSrv.requestNotification();
      }, 1000);
    }
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
      return value !== compare ? { password: true } : null;
    }
  }

  private passwordMatch(): void {
    this.password?.valueChanges
     .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_: string) => this.password2?.updateValueAndValidity())
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get name(): AbstractControl { return this.signUpForm.get('name') as AbstractControl; }
  get rol(): AbstractControl { return this.signUpForm.get('rol') as AbstractControl; }
  get email(): AbstractControl { return this.signUpForm.get('email') as AbstractControl; }
  get password(): AbstractControl { return this.signUpForm.get('password') as AbstractControl; }
  get password2(): AbstractControl { return this.signUpForm.get('password2') as AbstractControl; }

}
