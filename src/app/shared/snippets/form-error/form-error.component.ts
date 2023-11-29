import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidatorEnum, ValidatorType } from '@shared/types/types.enums';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})

export class FormErrorComponent {

  @Input() control!: AbstractControl;
  @Input() validator!: string[];

  constructor() { }

  swichError: {[key: string]: () => boolean} = {
    INVALID: () => !!this.control && this.control.invalid && this.control.dirty,
    MIN_LENGTH: () => this.haveError(ValidatorEnum.MIN_LENGTH, 'minlength'),
    MAX_LENGTH: () => this.haveError(ValidatorEnum.MAX_LENGTH, 'maxlength'),
    REQUIRED: () => this.haveError(ValidatorEnum.REQUIRED, 'required'),
    PATTERN: () => this.haveError(ValidatorEnum.PATTERN, 'pattern'),
    EMAIL: () => this.haveError(ValidatorEnum.EMAIL, 'email'),
    PASSWORD: () => this.haveError(ValidatorEnum.PASSWORD, 'password')
  }

  private haveError(
    type: ValidatorType, 
    prop: string
  ): boolean {
    return !!this.control && this.validator.includes(type) && 
           !!this.control.errors && !!this.control.errors[prop]
  }

}
