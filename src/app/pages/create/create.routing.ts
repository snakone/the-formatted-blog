import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from '@core/guards/drafts/active.guard';
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
        component: CreateFormComponent,
        canActivate: [ActiveGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateRoutingModule { }
