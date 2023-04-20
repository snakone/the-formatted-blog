import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateComponent } from './create.component';

import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { CreateRoutingModule } from './create.routing';
import { SnippetsModule } from '@shared/snippets/snippets.module';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';
import { DraftLayoutModule } from '@shared/layout/draft/draft-layout.module';

import { CreateContentComponent } from './components/create-content/create-content.component';
import { MatSelectModule } from '@angular/material/select';
import { CreateSidebarComponent } from './components/create-sidebar/create-sidebar.component';
import { CreateFormComponent } from './components/create-form/create-form.component';

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
    NgxPaginationModule,
    DraftLayoutModule,
    ...Material
  ]
})

export class CreateModule { }
