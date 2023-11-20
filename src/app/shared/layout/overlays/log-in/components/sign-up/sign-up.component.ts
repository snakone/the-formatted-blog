import { 
  Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  EventEmitter, 
  Output 
} from '@angular/core';

import { 
  AbstractControl, 
  UntypedFormGroup, 
  UntypedFormControl, 
  Validators, 
  ValidatorFn, 
  ValidationErrors 
} from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { UsersFacade } from '@store/users/users.facade';
import { User } from '@shared/types/interface.types';
import { LogInOverlayComponent } from '../../log-in.component';
import { PWAService } from '@core/services/pwa/pwa.service';
import { UtilsService } from '@core/services/utils/utils.service';
import { UserProfile } from '@shared/types/class.types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUpComponent implements OnInit {

  @Output() login = new EventEmitter<void>();
  signUpForm!: UntypedFormGroup;
  matchError = false;
  private unsubscribe$ = new Subject<void>();
  
  notify = false;
  conditions = false;

  constructor(
    public dialogRef: MatDialogRef<LogInOverlayComponent>,
    private userFcd: UsersFacade,
    private pwaSrv: PWAService,
    private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
    this.passwordMatch();
  }

  private createSignInForm(): void {
    this.signUpForm = new UntypedFormGroup({
      name: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-ZáéíóúüñçÁÉÍÓÚÜÑÇ][a-zA-ZáéíóúüñçÁÉÍÓÚÜÑÇ\s]*[a-zA-ZáéíóúüñçÁÉÍÓÚÜÑÇ]$/)
      ]),
      email: new UntypedFormControl(null, [
         Validators.required,
         Validators.email,
         Validators.minLength(6),
         Validators.maxLength(35)
      ]),
      role: new UntypedFormControl(null, [
        Validators.maxLength(35)
      ]),
      password: new UntypedFormControl(null, [
         Validators.required,
         Validators.minLength(5),
         Validators.maxLength(25)
      ]),
      password2: new UntypedFormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        this.comparePassword()
     ])
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid || !this.conditions) { return; }
    const { role } = this.signUpForm.value;
    const user = { 
      ...this.signUpForm.value, 
      profile: new UserProfile(role)
    } satisfies User;

    delete user.password2;
    delete user.role;

    try {
      user.profile.location = await this.utils
        .getFriendlyLocation().catch(err => {
        return null;
      });

      this.userFcd.register(user as User);
    } catch (err) {
      user.profile.location = null;
    }
    
    if (this.notify) {
      setTimeout(() => this.pwaSrv.requestNotification(), 1000);
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
  get role(): AbstractControl { return this.signUpForm.get('role') as AbstractControl; }
  get email(): AbstractControl { return this.signUpForm.get('email') as AbstractControl; }
  get password(): AbstractControl { return this.signUpForm.get('password') as AbstractControl; }
  get password2(): AbstractControl { return this.signUpForm.get('password2') as AbstractControl; }

}
