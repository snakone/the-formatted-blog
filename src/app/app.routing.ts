import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '@core/guards/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module')
       .then(mod => mod.HomeModule), data: { name: 'Home' }
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./pages/create/create.module')
       .then(mod => mod.CreateModule), data: { name: 'Create' }
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./pages/news/news.module')
       .then(mod => mod.NewsModule), data: { name: 'News' }
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./pages/help/help.module')
       .then(mod => mod.HelpModule), data: { name: 'Help' }
  },
  {
    path: 'profile',
    canActivate: [UserGuard],
    loadChildren: () =>
      import('./pages/profile/profile.module')
       .then(mod => mod.ProfileModule), data: { name: 'Profile' }
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./pages/post/post.module')
       .then(mod => mod.PostModule), data: { name: 'Post' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class RoutingModule { }
