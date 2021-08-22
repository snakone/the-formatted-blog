import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { HomeRoutingModule } from './home.routing';
import { HeaderModule } from '@layout/header/header.module';
import { SectionModule } from '@layout/section/section.module';

import { HomeComponent } from './home.component';
import { MainPostComponent } from './components/main-post/main-post.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { PostCarrouselComponent } from './components/post-carrousel/post-carrousel.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { HomeSidebarComponent } from './components/home-sidebar/home-sidebar.component';
import { LayoutModule } from '@layout/layout.module';
import { DirectivesModule } from '@shared/directives/directives.module';

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
    HeaderModule,
    SectionModule,
    LayoutModule,
    DirectivesModule
  ]
})

export class HomeModule { }
