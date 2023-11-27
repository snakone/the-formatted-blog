import { 
  Component, 
  OnInit, 
  ChangeDetectionStrategy, 
  EventEmitter, 
  Output 
} from '@angular/core';

import { 
  AbstractControl, 
  Validators, 
  ValidatorFn, 
  ValidationErrors, 
  FormGroup,
  FormControl
} from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

import { UsersFacade } from '@store/users/users.facade';
import { LogInOverlayComponent } from '../../log-in.component';
import { PWAService } from '@core/services/pwa/pwa.service';
import { UtilsService } from '@core/services/utils/utils.service';
import { UserProfile } from '@shared/types/class.types';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '@shared/types/interface.user';
import { SignUpForm } from '@shared/types/interface.form';

import { SIGN_UP_FORM } from '@shared/data/forms';
import { EMAIL_KEY, NAME_KEY, PASSWORD2_KEY, PASSWORD_KEY, ROLE_KEY } from '@shared/data/constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SignUpComponent implements OnInit {

  @Output() login = new EventEmitter<void>();
  signUpForm!: FormGroup<SignUpForm>;
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
    this.signUpForm = new FormGroup<SignUpForm>({
      ...SIGN_UP_FORM,
      password2: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
        this.comparePassword()
     ])
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.signUpForm.invalid || !this.conditions) { return; }

    const user = this.createUser();
    await this.setFriendlyLocation(user);
    this.userFcd.register(user);
    this.dialogRef.close();
  }

  public signIn(): void {
    this.login.emit();
  }

  private createUser(): User {
    const { role, password2, ...userValues } = this.signUpForm.value;
    return {
      ...userValues,
      profile: new UserProfile(role)
    } as User;
  }

  private async setFriendlyLocation(user: User): Promise<void> {
    try {
      user.profile.location = await this.utils.getFriendlyLocation();
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      user.profile.location = null;
    }
  }

  private comparePassword(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value;
      const compare = this.getControl(PASSWORD_KEY)?.value;
      if (!value || !compare) { return null; }
      return value !== compare ? { password: true } : null;
    }
  }

  private passwordMatch(): void {
    this.password?.valueChanges
     .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_: string) => this.password2?.updateValueAndValidity())
  }

  private getControl(name: string): AbstractControl | null {
    return this.signUpForm?.get(name);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    if (this.notify) {
      setTimeout(() => this.pwaSrv.requestNotification(), 1000);
    }
  }

  get name(): AbstractControl { return this.getControl(NAME_KEY); }
  get role(): AbstractControl { return this.getControl(ROLE_KEY); }
  get email(): AbstractControl { return this.getControl(EMAIL_KEY); }
  get password(): AbstractControl { return this.getControl(PASSWORD_KEY); }
  get password2(): AbstractControl { return this.getControl(PASSWORD2_KEY); }

}
