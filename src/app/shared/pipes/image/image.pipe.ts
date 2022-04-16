import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'image'})

export class ImagePipe implements PipeTransform {
  transform(value: string | undefined, args?: string): string {
    if (args) { return `assets/images/${args}/${value}`; }
    return `assets/images/${value}`;
  }
}
