import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule } from '@shared/directives/directives.module';
import { TextSliderComponent } from './text-slider/text-slider.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuillToolbarComponent } from './quill-toolbar/quill-toolbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

const Material = [
  MatTooltipModule
];

@NgModule({
  declarations: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent,
    PaginationComponent,
    QuillToolbarComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    NgxPaginationModule,
    RouterModule,
    ...Material
  ],
  exports: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent,
    PaginationComponent,
    QuillToolbarComponent
  ]
})

export class SnippetsModule { }
