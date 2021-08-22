import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HammerModule } from '@angular/platform-browser';
import { SnippetsModule } from '../snippets/snippets.module';
import { SharedModule } from '../shared.module';
import { HeaderModule } from './header/header.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './navbar/components/search-bar/search-bar.component';
import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    PostCardComponent
  ],
  imports: [
    CommonModule,
    HammerModule,
    SnippetsModule,
    SharedModule,
    HeaderModule
  ],
  exports: [
    NavbarComponent,
    HeaderModule,
    PostCardComponent
  ]
})

export class LayoutModule { }
