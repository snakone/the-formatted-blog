import { ComponentType } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({providedIn: 'root'})

export class CrafterService {

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

}
