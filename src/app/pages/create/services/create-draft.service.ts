import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CreateDraftService {

  onDraftDelete$ = new Subject<string>();

  constructor() { }

  public onDeleteDraft(id: string): void {
    this.onDraftDelete$.next(id);
  }
}
