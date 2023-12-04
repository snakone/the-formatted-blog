import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search.routing';
import { SearchComponent } from './search.component';
import { LayoutModule } from '@shared/layout/layout.module';
import { SearhContentComponent } from './components/searh-content/searh-content.component';
import { UserLayoutModule } from '@shared/layout/user/user-layout.module';
import { SearhSidebarComponent } from './components/searh-sidebar/searh-sidebar.component';
import { MatTooltipModule } from '@angular/material/tooltip';

const Material = [
  MatTooltipModule
];

@NgModule({
  declarations: [
    SearchComponent,
    SearhContentComponent,
    SearhSidebarComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    LayoutModule,
    UserLayoutModule,
    ...Material
  ]
})

export class SearchModule { }
