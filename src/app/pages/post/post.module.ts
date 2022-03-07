import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@layout/layout.module';
import { SnippetsModule } from '@shared/snippets/snippets.module';
import { PostRoutingModule } from './post.routing';
import { PostComponent } from './post.component';
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
    LayoutModule,
    SnippetsModule
  ]
})

export class PostModule { }
