import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@shared/layout/layout.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminContentComponent } from './components/admin-content/admin-content.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';
import { DraftLayoutModule } from '@shared/layout/draft/draft-layout.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { AdminDraftComponent } from './components/admin-draft/admin-draft.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_LEGACY_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

const Material = [
  MatFormFieldModule,
  MatDialogModule,
  MatTooltipModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    AdminComponent,
    AdminContentComponent,
    AdminSidebarComponent,
    AdminDraftComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    DraftsAccessModule,
    DraftLayoutModule,
    PipesModule,
    ...Material,
    FormsModule
  ],
  providers: [
    {provide: MAT_LEGACY_DIALOG_DATA, useValue: {}},
    { provide: MatDialogRef, useValue: {} }
  ]
})

export class AdminModule { }
