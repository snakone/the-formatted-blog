import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module')
       .then(mod => mod.HomeModule), data: { name: 'Home' }
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./pages/post/post.module')
       .then(mod => mod.PostModule), data: { name: 'Post' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
