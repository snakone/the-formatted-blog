import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';

import { SnippetsModule } from '../snippets/snippets.module';
import { SharedModule } from '../shared.module';
import { HeaderModule } from './header/header.module';
import { BoxesModule } from './boxes/boxes.module';
import { DirectivesModule } from '../directives/directives.module';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './navbar/components/search-bar/search-bar.component';
import { StickyAsideComponent } from './sticky-aside/sticky-aside.component';
import { FooterModule } from './footer/footer.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OverlaysModule } from './overlays/overlays.module';
import { PostLayoutModule } from './post/post-layout.module';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { MinWidthComponent } from './min-width/min-width.component';
import { SectionComponent } from './section/section.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SectionComponent,
    SearchBarComponent,
    StickyAsideComponent,
    SidebarComponent,
    ActionBarComponent,
    SpinnerComponent,
    MinWidthComponent
  ],
  imports: [
    CommonModule,
    HammerModule,
    SnippetsModule,
    SharedModule,
    HeaderModule,
    BoxesModule,
    DirectivesModule,
    RouterModule,
    FooterModule,
    OverlaysModule,
    PostLayoutModule
  ],
  exports: [
    NavbarComponent,
    SectionComponent,
    HeaderModule,
    BoxesModule,
    StickyAsideComponent,
    FooterModule,
    SidebarComponent,
    PostLayoutModule,
    ActionBarComponent,
    SpinnerComponent,
    OverlaysModule,
    MinWidthComponent
  ]
})

export class LayoutModule { }
