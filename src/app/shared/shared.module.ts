import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  exports: [
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    DirectivesModule
  ]
})

export class SharedModule { }
