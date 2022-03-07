import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { ProfileFavoritesComponent } from './components/profile-favorites/profile-favorites.component';
import { ProfilePostsComponent } from './components/profile-posts/profile-posts.component';
import { ProfileComponent } from './profile.component';
import { ProfileFriendsComponent } from './components/profile-friends/profile-friends.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileContentComponent
      },
      {
        path: 'posts',
        component: ProfilePostsComponent
      },
      {
        path: 'friends',
        component: ProfileFriendsComponent
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      },
      {
        path: 'settings',
        component: ProfileSettingsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
