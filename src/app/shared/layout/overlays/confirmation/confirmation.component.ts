import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
