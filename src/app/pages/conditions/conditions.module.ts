import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConditionsRoutingModule } from './conditions-routing.module';
import { ConditionsComponent } from './conditions.component';
import { LayoutModule } from '@shared/layout/layout.module';
import { MatTabsModule } from '@angular/material/tabs';

const Material = [
  MatTabsModule
];

@NgModule({
  declarations: [
    ConditionsComponent
  ],
  imports: [
    CommonModule,
    ConditionsRoutingModule,
    LayoutModule,
    ...Material
  ]
})

export class ConditionsModule { }
