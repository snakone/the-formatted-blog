import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

import { 
  ProfileSettingsComponent,
  ProfileRankingComponent,
  ProfileContentComponent,
  ProfileFavoritesComponent,
  ProfilePostsComponent,
  ProfileFriendsComponent
} from './profile.index';

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
        path: 'ranking',
        component: ProfileRankingComponent
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
