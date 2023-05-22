import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@layout/layout.module';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';

import {
  ProfileHomeComponent,
  ProfileHeaderComponent,
  ProfilePostsComponent,
  ProfileFriendsComponent,
  ProfileSettingsComponent,
  ProfileFavoritesComponent,
  ProfileDraftsComponent
} from './profile.index';

import { ProfileHomeContentComponent } from './components/profile-home/components/profile-home-content/profile-home-content.component';
import { ProfileHomeSidebarComponent } from './components/profile-home/components/profile-home-sidebar/profile-home-sidebar.component';
import { ActivitiesAccessModule } from '@core/ngrx/activities/data-access/activities-access.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHomeComponent,
    ProfileHeaderComponent,
    ProfilePostsComponent,
    ProfileFriendsComponent,
    ProfileSettingsComponent,
    ProfileFavoritesComponent,
    ProfileDraftsComponent,
    ProfileHomeContentComponent,
    ProfileHomeSidebarComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutModule,
    DraftsAccessModule,
    ActivitiesAccessModule
  ]
})

export class ProfileModule { }
