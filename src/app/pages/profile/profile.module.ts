import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutModule } from '@layout/layout.module';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileFriendsComponent } from './components/profile-friends/profile-friends.component';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ProfileFavoritesComponent } from './components/profile-favorites/profile-favorites.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileHeaderComponent,
    ProfileContentComponent,
    ProfileSidebarComponent,
    ProfilePostsComponent,
    ProfileFriendsComponent,
    ProfileSettingsComponent,
    ProfileFavoritesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    LayoutModule,
    MatExpansionModule
  ]
})

export class ProfileModule { }
