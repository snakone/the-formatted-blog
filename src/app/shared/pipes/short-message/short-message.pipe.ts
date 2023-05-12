import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'shortMessage'})

export class ShortMessagePipe implements PipeTransform {

  transform(
    value: string, 
    alone: boolean,
    small: boolean
  ): string | null {
    if (!value) return '';
    return alone ? value : small ? (value.slice(0, 325) + '...') : (value.slice(0, 610) + '...');
  }

}
