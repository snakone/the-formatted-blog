import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';

import { SnippetsModule } from '../snippets/snippets.module';
import { SharedModule } from '../shared.module';
import { HeaderModule } from './header/header.module';
import { BoxesModule } from './boxes/boxes.module';
import { SectionModule } from './section/section.module';
import { DirectivesModule } from '../directives/directives.module';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './navbar/components/search-bar/search-bar.component';
import { PostCardComponent } from './post-card/post-card.component';
import { StickyAsideComponent } from './sticky-aside/sticky-aside.component';
import { FooterModule } from './footer/footer.module';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    PostCardComponent,
    StickyAsideComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    HammerModule,
    SnippetsModule,
    SharedModule,
    HeaderModule,
    BoxesModule,
    SectionModule,
    DirectivesModule,
    RouterModule,
    FooterModule
  ],
  exports: [
    NavbarComponent,
    HeaderModule,
    PostCardComponent,
    BoxesModule,
    SectionModule,
    StickyAsideComponent,
    FooterModule,
    LoaderComponent
  ]
})

export class LayoutModule { }
