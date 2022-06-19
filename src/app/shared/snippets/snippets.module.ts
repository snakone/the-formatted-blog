import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DirectivesModule } from '@shared/directives/directives.module';
import { QuillService } from '@core/services/quill/quill.service';

import { TextSliderComponent } from './text-slider/text-slider.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { PaginationComponent } from './pagination/pagination.component';
import { QuillToolbarComponent } from './quill-toolbar/quill-toolbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SnackOverlayComponent } from './snack/snack.component';

const Material = [
  MatTooltipModule
];

@NgModule({
  declarations: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent,
    PaginationComponent,
    QuillToolbarComponent,
    SpinnerComponent,
    SnackOverlayComponent
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
    QuillToolbarComponent,
    SpinnerComponent,
    SnackOverlayComponent
  ],
  providers: [QuillService]
})

export class SnippetsModule { }
