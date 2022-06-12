import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateContentComponent } from './components/create-content/create-content.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { CreateComponent } from './create.component';

const routes: Routes = [
  {
    path: '',
    component: CreateComponent,
    children: [
      {
        path: '',
        component: CreateContentComponent
      },
      {
        path: 'form',
        component: CreateFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateRoutingModule { }
