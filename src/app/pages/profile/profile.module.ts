import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@layout/layout.module';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { UserLayoutModule } from '@shared/layout/user/user-layout.module';

import {
  ProfileHomeComponent,
  ProfileHeaderComponent,
  ProfilePostsComponent,
  ProfileFriendsComponent,
  ProfileSettingsComponent,
  ProfileFavoritesComponent,
  ProfileDraftsComponent,
  ProfilePublicComponent
} from './profile.index';

import { ProfileHomeContentComponent } from './components/profile-home/components/profile-home-content/profile-home-content.component';
import { ProfileHomeSidebarComponent } from './components/profile-home/components/profile-home-sidebar/profile-home-sidebar.component';
import { ActivitiesAccessModule } from '@core/ngrx/activities/data-access/activities-access.module';
import { SkeletonModule } from '@shared/snippets/skeleton/skeleton.module';
import { ProfileFriendsContentComponent } from './components/profile-friends/components/profile-friends-content/profile-friends-content.component';
import { ProfileFriendsSidebarComponent } from './components/profile-friends/components/profile-friends-sidebar/profile-friends-sidebar.component';
import { ProfileSettingsContentComponent } from './components/profile-settings/components/profile-settings-content/profile-settings-content.component';
import { ProfileSettingsSidebarComponent } from './components/profile-settings/components/profile-settings-sidebar/profile-settings-sidebar.component';

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
    ProfileHomeSidebarComponent,
    ProfilePublicComponent,
    ProfileFriendsContentComponent,
    ProfileFriendsSidebarComponent,
    ProfileSettingsContentComponent,
    ProfileSettingsSidebarComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutModule,
    DraftsAccessModule,
    ActivitiesAccessModule,
    SkeletonModule,
    PipesModule,
    UserLayoutModule
  ]
})

export class ProfileModule { }
