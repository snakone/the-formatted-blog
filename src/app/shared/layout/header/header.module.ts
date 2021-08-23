import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SloganComponent } from './components/slogan/slogan.component';
import { HeaderComponent } from './header.component';
import { SnippetsModule } from '../../snippets/snippets.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SloganComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SnippetsModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule { }
