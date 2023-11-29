import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { QuillModule } from 'ngx-quill';

import { PipesModule } from '@shared/pipes/pipes.module';
import { PostCardComponent } from './post-card/post-card.component';
import { PostCarrouselComponent } from './post-carrousel/post-carrousel.component';
import { FormsModule } from '@angular/forms';
import { PostSearchComponent } from './post-search/post-search.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const Material = [
  MatTooltipModule
];

@NgModule({
  declarations: [
    PostCardComponent,
    PostCarrouselComponent,
    PostSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    PipesModule,
    QuillModule,
    FormsModule,
    ...Material
  ],
  exports: [
    PostCardComponent,
    PostCarrouselComponent,
    PostSearchComponent
  ]
})

export class PostLayoutModule { }
