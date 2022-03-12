import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { LogInModule } from './log-in/log-in.module';
import { SnackComponent } from './snack/snack.component';
import { PushDeniedOverlayComponent } from './push-denied/push-denied.component';

const Material = [
  MatDialogModule,
];

@NgModule({
  declarations: [
    SnackComponent,
    PushDeniedOverlayComponent
  ],
  imports: [
    CommonModule,
    LogInModule,
    ...Material
  ],
  exports: [
    SnackComponent,
    PushDeniedOverlayComponent
  ]
})

export class OverlaysModule { }
