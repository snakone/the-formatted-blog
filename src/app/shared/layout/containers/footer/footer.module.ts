import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer.component';
import { FooterNavComponent } from './components/footer-nav/footer-nav.component';
import { FooterGalleryComponent } from './components/footer-gallery/footer-gallery.component';

@NgModule({
  declarations: [
    FooterComponent,
    FooterNavComponent,
    FooterGalleryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent
  ]
})

export class FooterModule { }
