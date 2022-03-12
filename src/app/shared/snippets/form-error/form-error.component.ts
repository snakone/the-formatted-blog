import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})

export class FormErrorComponent {

  @Input() control!: AbstractControl;
  @Input() validator!: string[];
  @Input() left = false;

  constructor() { }

}
