import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { LayoutModule } from '@layout/layout.module';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    ProfileContentComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutModule
  ]
})

export class ProfileModule { }
