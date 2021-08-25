import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post.routing';
import { PostComponent } from './post.component';
import { LayoutModule } from '@layout/layout.module';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    LayoutModule
  ]
})

export class PostModule { }
