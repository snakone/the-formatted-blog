import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { QuillModule } from 'ngx-quill';

import { LogInModule } from './log-in/log-in.module';
import { PushDeniedOverlayComponent } from './push-denied/push-denied.component';
import { QuillHelpComponent } from './quill-help/quill-help.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DraftPreviewDialogComponent } from './draft-preview/draft-preview.component';
import { EditProfileDialogComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnippetsModule } from '@shared/snippets/snippets.module';
import { MatDialogRef } from '@angular/material/dialog';

const Material = [
  MatDialogModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    PushDeniedOverlayComponent,
    QuillHelpComponent,
    ConfirmationComponent,
    DraftPreviewDialogComponent,
    EditProfileDialogComponent
  ],
  imports: [
    CommonModule,
    LogInModule,
    QuillModule,
    ReactiveFormsModule,
    SnippetsModule,
    ...Material
  ],
  exports: [
    PushDeniedOverlayComponent,
    QuillHelpComponent,
    ConfirmationComponent,
    DraftPreviewDialogComponent,
    EditProfileDialogComponent
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ]
})

export class OverlaysModule { }
