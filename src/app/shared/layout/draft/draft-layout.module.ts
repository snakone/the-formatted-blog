import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { DraftCardComponent } from './draft-card/draft-card.component';
import { AdminDraftCardComponent } from './admin-draft-card/admin-draft-card.component';
import { SharedModule } from '@shared/shared.module';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';

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
    ...Material
  ],
  exports: [
    DraftCardComponent,
    AdminDraftCardComponent
  ]
})

export class DraftLayoutModule { }
