import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInOverlayComponent } from './log-in/log-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnippetsModule } from '@shared/snippets/snippets.module';

const Material = [
  MatDialogModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule
];

@NgModule({
  declarations: [
    LogInOverlayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SnippetsModule,
    ...Material
  ]
})

export class OverlaysModule { }
