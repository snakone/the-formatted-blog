import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SnippetsModule } from '../snippets/snippets.module';
import { SharedModule } from '../shared.module';
import { HeaderModule } from './containers/header/header.module';
import { FooterModule } from './containers/footer/footer.module';
import { BoxesModule } from './containers/boxes/boxes.module';
import { OverlaysModule } from './overlays/overlays.module';
import { PostLayoutModule } from './post/post-layout.module';

import { NavbarComponent } from './containers/navbar/navbar.component';
import { SearchBarComponent } from './containers/navbar/components/search-bar/search-bar.component';
import { StickyAsideComponent } from './containers/sticky-aside/sticky-aside.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { ActionBarComponent } from './containers/action-bar/action-bar.component';
import { MinWidthComponent } from './containers/min-width/min-width.component';
import { SectionComponent } from './containers/section/section.component';
import { DraftLayoutModule } from './draft/draft-layout.module';

@NgModule({
  declarations: [
    ActionBarComponent,
    MinWidthComponent,
    NavbarComponent,
    SectionComponent,
    SidebarComponent,
    StickyAsideComponent,
    SearchBarComponent,
  ],
  imports: [
    CommonModule,
    BoxesModule,
    FooterModule,
    HeaderModule,
    RouterModule,
    HammerModule,
    SharedModule,
    SnippetsModule,
    PostLayoutModule,
    DraftLayoutModule,
    OverlaysModule
  ],
  exports: [
    ActionBarComponent,
    MinWidthComponent,
    NavbarComponent,
    SectionComponent,
    SidebarComponent,
    StickyAsideComponent,
    BoxesModule,
    FooterModule,
    PostLayoutModule,
    HeaderModule,
    SnippetsModule
  ]
})

export class LayoutModule { }
