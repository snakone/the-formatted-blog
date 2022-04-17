import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create.routing';
import { CreateComponent } from './create.component';
import { QuillModule } from 'ngx-quill';
import { LayoutModule } from '@shared/layout/layout.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CreateRoutingModule,
    QuillModule,
    SharedModule
  ]
})

export class CreateModule { }
