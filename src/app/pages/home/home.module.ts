import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { LayoutModule } from '@layout/layout.module';

import { HomeComponent } from './home.component';
import { MainPostComponent } from './components/main-post/main-post.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainPostComponent,
    HomeContentComponent,
    HomeSidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule
  ]
})

export class HomeModule { }
