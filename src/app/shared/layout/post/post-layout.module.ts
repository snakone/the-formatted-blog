import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { PostCarrouselComponent } from './post-carrousel/post-carrousel.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    PostCardComponent,
    PostCarrouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    PipesModule
  ],
  exports: [
    PostCardComponent,
    PostCarrouselComponent
  ]
})

export class PostLayoutModule { }
