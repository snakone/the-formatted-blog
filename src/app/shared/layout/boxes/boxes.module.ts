import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentPostBoxComponent } from './recent-post-box/recent-post-box.component';
import { SocialBoxComponent } from './social-box/social-box.component';
import { CategoryBoxComponent } from './category-box/category-box.component';

@NgModule({
  declarations: [
    RecentPostBoxComponent,
    SocialBoxComponent,
    CategoryBoxComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RecentPostBoxComponent,
    SocialBoxComponent,
    CategoryBoxComponent,
  ]
})

export class BoxesModule { }
