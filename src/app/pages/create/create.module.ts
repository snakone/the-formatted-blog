import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { CreateComponent } from './create.component';

import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { CreateRoutingModule } from './create.routing';
import { SnippetsModule } from '@shared/snippets/snippets.module';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';
import { DraftLayoutModule } from '@shared/layout/draft/draft-layout.module';

import { CreateContentComponent } from './components/create-content/create-content.component';
import { CreateSidebarComponent } from './components/create-sidebar/create-sidebar.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CreateDraftService } from './services/create-draft.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';

const Material = [
  MatTooltipModule,
  MatSelectModule
];

@NgModule({
  declarations: [
    CreateComponent,
    CreateContentComponent,
    CreateSidebarComponent,
    CreateFormComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CreateRoutingModule,
    QuillModule,
    SharedModule,
    SnippetsModule,
    DraftsAccessModule,
    DraftLayoutModule,
    ...Material
  ],
  providers: [
    CreateDraftService
  ]
})

export class CreateModule { }
