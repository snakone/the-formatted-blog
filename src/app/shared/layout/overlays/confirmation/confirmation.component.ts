import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmationComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) 
     public data: {title: string, message: string}
  ) { }

}
