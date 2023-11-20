import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetsModule } from '@shared/snippets/snippets.module';
import { SharedModule } from '@shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInOverlayComponent } from './log-in.component';

import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { UtilsService } from '@core/services/utils/utils.service';

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
  ],
  providers: [
    UtilsService
  ]
})

export class LogInModule { }
