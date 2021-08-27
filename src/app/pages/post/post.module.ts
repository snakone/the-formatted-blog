import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post.routing';
import { PostComponent } from './post.component';
import { LayoutModule } from '@layout/layout.module';
import { PostContentComponent } from './components/post-content/post-content.component';
import { PostSidebarComponent } from './components/post-sidebar/post-sidebar.component';

@NgModule({
  declarations: [
    PostComponent,
    PostContentComponent,
    PostSidebarComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    LayoutModule
  ]
})

export class PostModule { }
