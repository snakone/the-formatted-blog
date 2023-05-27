import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import { ConfirmationComponent } from '@layout/overlays/confirmation/confirmation.component';
import { Snack } from '@shared/types/interface.types';

@Injectable({providedIn: 'root'})

export class CrafterService {

  snack$: Subject<Snack> = new Subject<Snack>();
  time!: NodeJS.Timeout;
  alreadySnack: boolean;

  constructor(
    private matDialog: MatDialog
  ) { }

  public dialog<T>(
    component: ComponentType<T>,
    data?: any,
    id?: string,
    css?: string
  ): MatDialogRef<T> {
    return this.matDialog.open(component, {
      data, id: id || '', panelClass: css
    });
  }

  public setSnack(
    message: string | null,
    type: snackType = 'info',
    duration: number = 3000
  ): void {
    if (this.alreadySnack) { return; }
    setTimeout(() => {
      this.snack$.next({message, type});
      this.alreadySnack = true;
      
      this.time = setTimeout(() => {
        this.snack$.next({message: null});
        this.clearSnack();
        this.alreadySnack = false;
      }, duration);

    }, this.time ? duration : 0);
  }

  private clearSnack(): void {
    clearTimeout(this.time);
    this.time = null;
  }

  public confirmation(
    { title, message }: { title: string, message: string }
  ): MatDialogRef<ConfirmationComponent> {
    return this.matDialog.open(ConfirmationComponent, {
      data: { title, message }
    })
  }

}

type snackType = 'success' | 'info' | 'warning' | 'error';
