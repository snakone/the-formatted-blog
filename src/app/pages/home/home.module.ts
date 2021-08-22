import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { MainPostComponent } from './components/main-post/main-post.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { PostCarrouselComponent } from './components/post-carrousel/post-carrousel.component';
import { HeaderModule } from '@layout/header/header.module';

@NgModule({
  declarations: [
    HomeComponent,
    MainPostComponent,
    NotificationBarComponent,
    PostCarrouselComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarouselModule,
    HeaderModule
  ]
})

export class HomeModule { }
