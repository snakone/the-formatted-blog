import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@layout/layout.module';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { DraftsAccessModule } from '@store/drafts/data-access/drafts-access.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { UserLayoutModule } from '@shared/layout/user/user-layout.module';
import { ActivitiesAccessModule } from '@core/ngrx/activities/data-access/activities-access.module';
import { SkeletonModule } from '@shared/snippets/skeleton/skeleton.module';

import {
  ProfileHomeComponent,
  ProfileHeaderComponent,
  ProfilePostsComponent,
  ProfileFriendsComponent,
  ProfileSettingsComponent,
  ProfileFavoritesComponent,
  ProfileDraftsComponent,
  ProfilePublicComponent,
  ProfileHomeContentComponent,
  ProfileHomeSidebarComponent,
  ProfileFriendsContentComponent,
  ProfileFriendsSidebarComponent,
  ProfileSettingsContentComponent,
  ProfileSettingsSidebarComponent
} from './profile.index';

import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProfileSettingsService } from './components/profile-settings/services/profile-settings.service';
import { SharedModule } from '@shared/shared.module';

const Material = [
  MatRadioModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatTooltipModule
];

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
    UserLayoutModule,
    SharedModule,
    ...Material
  ],
  providers: [
    ProfileSettingsService
  ]
})

export class ProfileModule { }
