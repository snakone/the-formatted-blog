import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class CreateDraftService {

  onDraftDelete$ = new Subject<string>();
  onCollapse$ = new Subject<boolean>();
  onSaveTemportal$ = new Subject<string>();

  constructor() { }

  public onDeleteDraft(id: string): void {
    this.onDraftDelete$.next(id);
  }

  public onCollapse(collapse: boolean): void {
    this.onCollapse$.next(collapse);
  }

  public onSaveTemporal(id: string): void {
    this.onSaveTemportal$.next(id);
  }
}
