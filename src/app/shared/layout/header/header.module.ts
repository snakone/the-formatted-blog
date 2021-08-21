import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerModule } from '@angular/platform-browser';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SloganComponent } from './components/slogan/slogan.component';
import { HeaderComponent } from './header.component';
import { SharedModule } from '@shared/shared.module';
import { SnippetsModule } from '@shared/snippets/snippets.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    SloganComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SnippetsModule,
    HammerModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule { }
