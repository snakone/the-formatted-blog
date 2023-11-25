import { Pipe, PipeTransform } from '@angular/core';
import { IMAGE_PATH } from '@shared/data/constants';

@Pipe({name: 'image'})

export class ImagePipe implements PipeTransform {
  transform(value: string | undefined, args?: string): string {
    if (args) return `${IMAGE_PATH}${args}/${value}`;
    return `${IMAGE_PATH}${value || 'placeholder.png'}`;
  }
}
