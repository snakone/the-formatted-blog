import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@layout/layout.module';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';

import {
  ProfileContentComponent,
  ProfileHeaderComponent,
  ProfilePostsComponent,
  ProfileFriendsComponent,
  ProfileSettingsComponent,
  ProfileFavoritesComponent,
  ProfileDraftsComponent
} from './profile.index';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileContentComponent,
    ProfileHeaderComponent,
    ProfilePostsComponent,
    ProfileFriendsComponent,
    ProfileSettingsComponent,
    ProfileFavoritesComponent,
    ProfileDraftsComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutModule,
    DraftsAccessModule
  ]
})

export class ProfileModule { }
