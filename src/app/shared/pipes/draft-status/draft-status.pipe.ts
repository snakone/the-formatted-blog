import { Pipe, PipeTransform } from '@angular/core';

const switchObj: any = {
  "not-seen": "No visto",
  "seen": "Visto",
  "pending": "Pendiente",
  "correct": "Correcto"
};

@Pipe({name: 'draftStatus'})

export class DraftStatusPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) { return ''; }
    return switchObj[value];
  }

}
