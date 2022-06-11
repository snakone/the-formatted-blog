import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationComponent } from '@shared/layout/overlays/confirmation/confirmation.component';
import { Snack } from '@shared/types/interface.types';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class CrafterService {

  snack$: Subject<Snack> = new Subject<Snack>();
  time!: NodeJS.Timeout;

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
    duration: number = 4000
  ): void {
    setTimeout(() => {
      this.snack$.next({message, type});
      this.time = setTimeout(() => {
        this.snack$.next({message: null});
        this.clearSnack();
      }, duration);
    }, this.time ? duration : 0);
  }

  private clearSnack(): void {
    clearTimeout(this.time);
    this.time = null;
  }

  public confirmation(
    title: string, 
    message: string
  ): MatDialogRef<ConfirmationComponent> {
    return this.matDialog.open(ConfirmationComponent, {
      data: { title, message }
    })
  }

}

type snackType = 'success' | 'info' | 'warning' | 'error';
