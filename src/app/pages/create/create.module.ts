import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';

import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { CreateRoutingModule } from './create.routing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnippetsModule } from '@shared/snippets/snippets.module';

import { CreateComponent } from './create.component';
import { CreateContentComponent } from './components/create-content/create-content.component';
import { CreateSidebarComponent } from './components/create-sidebar/create-sidebar.component';

const Material = [
  MatTooltipModule
];

@NgModule({
  declarations: [
    CreateComponent,
    CreateContentComponent,
    CreateSidebarComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    CreateRoutingModule,
    QuillModule,
    SharedModule,
    SnippetsModule,
    ...Material
  ]
})

export class CreateModule { }
