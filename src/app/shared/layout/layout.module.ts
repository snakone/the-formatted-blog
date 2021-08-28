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
import { StickyAsideComponent } from './sticky-aside/sticky-aside.component';
import { FooterModule } from './footer/footer.module';
import { LoaderComponent } from './loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OverlaysModule } from './overlays/overlays.module';
import { PostLayoutModule } from './post/post-layout.module';
import { NotificationBarComponent } from './notification-bar/notification-bar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent,
    StickyAsideComponent,
    LoaderComponent,
    SidebarComponent,
    NotificationBarComponent
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
    FooterModule,
    OverlaysModule,
    PostLayoutModule
  ],
  exports: [
    NavbarComponent,
    HeaderModule,
    BoxesModule,
    SectionModule,
    StickyAsideComponent,
    FooterModule,
    LoaderComponent,
    SidebarComponent,
    PostLayoutModule,
    NotificationBarComponent
  ]
})

export class LayoutModule { }
