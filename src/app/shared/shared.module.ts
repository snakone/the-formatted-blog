import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    PipesModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    PipesModule,
    ReactiveFormsModule
  ]
})

export class SharedModule { }
