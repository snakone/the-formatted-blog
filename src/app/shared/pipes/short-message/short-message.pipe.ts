import { Pipe, PipeTransform } from '@angular/core';
import { DeltaStatic } from 'quill';

@Pipe({name: 'shortMessage'})

export class ShortMessagePipe implements PipeTransform {

  transform(
    value: string, 
    alone: boolean,
    small: boolean
  ): string | DeltaStatic | null {
    if (!value) return '';
    return alone ? value : small ? null : (value.slice(0, 650) + '...');
  }

}
