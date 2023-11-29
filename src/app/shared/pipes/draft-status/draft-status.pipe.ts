import { Pipe, PipeTransform } from '@angular/core';
import { DraftStatusEnum } from '@shared/types/types.enums';

const switchStatus: {[key in DraftStatusEnum]: string} = {
  [DraftStatusEnum.NOT_SEEN]: "No visto",
  [DraftStatusEnum.SEEN]: "Visto",
  [DraftStatusEnum.PENDING]: "Pendiente",
  [DraftStatusEnum.APPROVED]: "Aprobado",
  [DraftStatusEnum.ALL]: "Todos"
};

@Pipe({name: 'draftStatus'})

export class DraftStatusPipe implements PipeTransform {

  transform(value: DraftStatusEnum | undefined): string {
    if (!value) { return DraftStatusEnum.NOT_SEEN; }
    return switchStatus[value];
  }

}
