import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '@shared/directives/directives.module';
import { TextSliderComponent } from './text-slider/text-slider.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    NgxPaginationModule
  ],
  exports: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent,
    PaginationComponent
  ]
})

export class SnippetsModule { }
