import { Injectable } from '@angular/core';
import { Snack } from '@shared/types/interface.types';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class SnackService {

  snack$: Subject<Snack> = new Subject<Snack>();

  constructor() { }

  setSnack(
    message: string,
    type: string = 'default',
    duration: number = 5000
  ) {
    this.snack$.next({message, type});
    setTimeout(() => {
      this.snack$.next({message: null});
    }, duration);
  }

}