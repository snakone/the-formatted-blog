import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentPostBoxComponent } from './recent-post-box/recent-post-box.component';
import { CategoryBoxComponent } from './category-box/category-box.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RecentPostBoxComponent,
    CategoryBoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RecentPostBoxComponent,
    CategoryBoxComponent,
  ]
})

export class BoxesModule { }
