import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@shared/layout/layout.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminContentComponent } from './components/admin-content/admin-content.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminContentComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    DraftsAccessModule
  ]
})

export class AdminModule { }
