import { Pipe, PipeTransform } from '@angular/core';
import { Delta } from 'quill';

@Pipe({name: 'shortMessage'})

export class ShortMessagePipe implements PipeTransform {

  transform(
    value: string | Delta | undefined, 
    alone: boolean,
    small: boolean
  ): string | Delta | null {
    if (!value) return '';
    return alone ? value : small ? null : (value.slice(0, 650) + '...');
  }

}
