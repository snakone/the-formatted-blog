import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraftCardComponent } from './draft-card/draft-card.component';
import { AdminDraftCardComponent } from './admin-draft-card/admin-draft-card.component';
import { SharedModule } from '@shared/shared.module';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

const Material = [
  MatTooltipModule
];

@NgModule({
  declarations: [
    DraftCardComponent,
    AdminDraftCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DraftsAccessModule,
    ...Material,
    RouterModule
  ],
  exports: [
    DraftCardComponent,
    AdminDraftCardComponent
  ]
})

export class DraftLayoutModule { }
