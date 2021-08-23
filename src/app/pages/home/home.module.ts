import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeRoutingModule } from './home.routing';
import { LayoutModule } from '@layout/layout.module';

import { HomeComponent } from './home.component';
import { MainPostComponent } from './components/main-post/main-post.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { PostCarrouselComponent } from './components/post-carrousel/post-carrousel.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    MainPostComponent,
    NotificationBarComponent,
    PostCarrouselComponent,
    HomeContentComponent,
    HomeSidebarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    LayoutModule
  ]
})

export class HomeModule { }
