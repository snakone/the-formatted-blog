import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';

import { LogInModule } from './log-in/log-in.module';
import { SnackOverlayComponent } from './snack/snack.component';
import { PushDeniedOverlayComponent } from './push-denied/push-denied.component';
import { QuillHelpComponent } from './quill-help/quill-help.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const Material = [
  MatDialogModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    SnackOverlayComponent,
    PushDeniedOverlayComponent,
    QuillHelpComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    LogInModule,
    QuillModule,
    ...Material
  ],
  exports: [
    SnackOverlayComponent,
    PushDeniedOverlayComponent,
    QuillHelpComponent,
    ConfirmationComponent
  ]
})

export class OverlaysModule { }
