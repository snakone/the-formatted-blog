import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { LogInModule } from './log-in/log-in.module';
import { PushDeniedDialogComponent } from './push-denied/push-denied.component';
import { QuillHelpDialogComponent } from './quill-help/quill-help.component';
import { ConfirmationDialogComponent } from './confirmation/confirmation.component';
import { DraftPreviewDialogComponent } from './draft-preview/draft-preview.component';
import { EditProfileDialogComponent } from './edit-profile/edit-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SnippetsModule } from '@shared/snippets/snippets.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import { PipesModule } from '@shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';

const Material = [
  MatDialogModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    PushDeniedDialogComponent,
    QuillHelpDialogComponent,
    ConfirmationDialogComponent,
    DraftPreviewDialogComponent,
    EditProfileDialogComponent
  ],
  imports: [
    CommonModule,
    LogInModule,
    QuillModule,
    ReactiveFormsModule,
    SnippetsModule,
    PipesModule,
    RouterModule,
    ...Material
  ],
  exports: [
    PushDeniedDialogComponent,
    QuillHelpDialogComponent,
    ConfirmationDialogComponent,
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
