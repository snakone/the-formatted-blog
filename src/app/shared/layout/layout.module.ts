import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnippetsModule } from '@shared/snippets/snippets.module';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './header/components/search-bar/search-bar.component';
import { SloganComponent } from './header/components/slogan/slogan.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    SloganComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SnippetsModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class LayoutModule { }
