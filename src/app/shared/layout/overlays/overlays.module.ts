import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { LogInModule } from './log-in/log-in.module';
import { SnackOverlayComponent } from './snack/snack.component';
import { PushDeniedOverlayComponent } from './push-denied/push-denied.component';

const Material = [
  MatDialogModule,
];

@NgModule({
  declarations: [
    SnackOverlayComponent,
    PushDeniedOverlayComponent
  ],
  imports: [
    CommonModule,
    LogInModule,
    ...Material
  ],
  exports: [
    SnackOverlayComponent,
    PushDeniedOverlayComponent
  ]
})

export class OverlaysModule { }
