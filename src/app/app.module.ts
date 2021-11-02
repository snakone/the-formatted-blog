import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { MinWidthComponent } from '@layout/min-width/min-width.component';
import { LayoutModule } from '@layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    MinWidthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
