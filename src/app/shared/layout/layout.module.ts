import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { SearchBarComponent } from './header/components/search-bar/search-bar.component';
import { HammerModule } from '@angular/platform-browser';
import { SnippetsModule } from '../snippets/snippets.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    HammerModule,
    SnippetsModule,
    SharedModule
  ],
  exports: [
    NavbarComponent
  ]
})

export class LayoutModule { }
