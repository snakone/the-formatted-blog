import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogProps } from '@shared/types/interface.app';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmationDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
     public data: ConfirmationDialogProps
  ) { }

}
