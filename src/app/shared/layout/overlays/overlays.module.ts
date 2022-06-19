import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QuillModule } from 'ngx-quill';

import { LogInModule } from './log-in/log-in.module';
import { PushDeniedOverlayComponent } from './push-denied/push-denied.component';
import { QuillHelpComponent } from './quill-help/quill-help.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DraftPreviewComponent } from './draft-preview/draft-preview.component';

const Material = [
  MatDialogModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    PushDeniedOverlayComponent,
    QuillHelpComponent,
    ConfirmationComponent,
    DraftPreviewComponent
  ],
  imports: [
    CommonModule,
    LogInModule,
    QuillModule,
    ...Material
  ],
  exports: [
    PushDeniedOverlayComponent,
    QuillHelpComponent,
    ConfirmationComponent,
    DraftPreviewComponent
  ]
})

export class OverlaysModule { }
