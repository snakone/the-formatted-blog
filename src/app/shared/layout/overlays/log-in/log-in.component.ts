import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LogInOverlayComponent implements OnInit {

  signInForm!: FormGroup;
  remember = false;

  constructor(
    public dialogRef: MatDialogRef<LogInOverlayComponent>
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  get email(): AbstractControl | any { return this.signInForm.get('email'); }
  get password(): AbstractControl | any { return this.signInForm.get('password'); }

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
    console.log(email, password);
  }

  public signUp(): void {
    console.log('sign up');
  }

  public recover(): void {
    this.dialogRef.close();
  }

}
