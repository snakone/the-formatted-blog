import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { CreateRoutingModule } from './create.routing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnippetsModule } from '@shared/snippets/snippets.module';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { CreateComponent } from './create.component';
import { CreateContentComponent } from './components/create-content/create-content.component';
import { CreateSidebarComponent } from './components/create-sidebar/create-sidebar.component';
import { CreateFormComponent } from './components/create-form/create-form.component';

import { MatSelectModule } from '@angular/material/select';

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
    ...Material
  ]
})

export class CreateModule { }
