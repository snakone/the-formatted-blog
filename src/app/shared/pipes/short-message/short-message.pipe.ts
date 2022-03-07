import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortMessage'})

export class ShortMessagePipe implements PipeTransform {

  transform(
    value: string | undefined, 
    alone: boolean,
    small: boolean
  ): string | null {
    if (!value) return '';
    return alone ? value : small ? null : (value.slice(0, 650) + '...');
  }

}
