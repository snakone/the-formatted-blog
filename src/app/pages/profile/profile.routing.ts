import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

import { 
  ProfileSettingsComponent,
  ProfileHomeComponent,
  ProfileFavoritesComponent,
  ProfilePostsComponent,
  ProfileFriendsComponent,
  ProfileDraftsComponent
} from './profile.index';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', component: ProfileHomeComponent },
      { path: 'posts', component: ProfilePostsComponent },
      { path: 'drafts', component: ProfileDraftsComponent },
      { path: 'friends', component: ProfileFriendsComponent },
      { path: 'favorites', component: ProfileFavoritesComponent },
      { path: 'settings', component: ProfileSettingsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileRoutingModule { }
