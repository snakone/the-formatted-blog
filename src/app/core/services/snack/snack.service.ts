import { Injectable } from '@angular/core';
import { Snack } from '@shared/types/interface.types';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SnackService {

  snack$: Subject<Snack> = new Subject<Snack>();
  time!: NodeJS.Timeout;

  constructor() { }

  public setSnack(
    message: string | null,
    type: string = 'info',
    duration: number = 4000
  ): void {
    this.clear();
    setTimeout(() => {
      this.snack$.next({message, type});
      this.time = setTimeout(() => this.snack$.next({message: null}), duration);
    }, this.time ? duration : 0);
  }

  private clear(): void {
    clearTimeout(this.time);
  }
  
}