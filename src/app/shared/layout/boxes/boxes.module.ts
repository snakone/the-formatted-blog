import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopularBoxComponent } from './popular-box/popular-box.component';
import { RecentPostBoxComponent } from './recent-post-box/recent-post-box.component';
import { SocialBoxComponent } from './social-box/social-box.component';
import { CategoryBoxComponent } from './category-box/category-box.component';

@NgModule({
  declarations: [
    PopularBoxComponent,
    RecentPostBoxComponent,
    SocialBoxComponent,
    CategoryBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopularBoxComponent,
    RecentPostBoxComponent,
    SocialBoxComponent,
    CategoryBoxComponent
  ]
})

export class BoxesModule { }
