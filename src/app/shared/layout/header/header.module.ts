import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SnippetsModule } from '../../snippets/snippets.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SloganComponent } from './components/slogan/slogan.component';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SloganComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    SnippetsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule { }
