import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '@shared/directives/directives.module';
import { QuillService } from '@core/services/quill/quill.service';

import { TextSliderComponent } from './text-slider/text-slider.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { QuillToolbarComponent } from './quill-toolbar/quill-toolbar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SnackOverlayComponent } from './snack/snack.component';

import { MatTooltipModule } from '@angular/material/tooltip';

const Material = [
  MatTooltipModule
];

@NgModule({
  declarations: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent,
    QuillToolbarComponent,
    SpinnerComponent,
    SnackOverlayComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    RouterModule,
    ...Material
  ],
  exports: [
    TextSliderComponent,
    FormErrorComponent,
    ScrollTopComponent,
    QuillToolbarComponent,
    SpinnerComponent,
    SnackOverlayComponent
  ],
  providers: [QuillService]
})

export class SnippetsModule { }
