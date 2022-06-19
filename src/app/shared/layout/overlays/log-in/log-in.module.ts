import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetsModule } from '@shared/snippets/snippets.module';
import { SharedModule } from '@shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInOverlayComponent } from './log-in.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const Material = [
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
];

@NgModule({
  declarations: [
    LogInOverlayComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SnippetsModule,
    ...Material
  ],
  exports: [
    LogInOverlayComponent
  ]
})

export class LogInModule { }
