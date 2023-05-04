import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@shared/layout/layout.module';
import { HelpRoutingModule } from './help.routing';
import { HelpComponent } from './help.component';
import { HelpHeaderComponent } from './components/help-header/help-header.component';
import { HelpContentComponent } from './components/help-content/help-content.component';
import { HelpSidebarComponent } from './components/help-sidebar/help-sidebar.component';

@NgModule({
  declarations: [
    HelpComponent,
    HelpHeaderComponent,
    HelpContentComponent,
    HelpSidebarComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule,
    LayoutModule
  ]
})

export class HelpModule { }
