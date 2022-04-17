import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    PipesModule
  ],
  exports: [
    FormsModule,
    PipesModule
  ]
})

export class SharedModule { }
