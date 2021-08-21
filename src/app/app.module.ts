import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { environment } from '@env/environment';
import { CoreModule } from '@core/core.module';
import { HammerConfig } from '@core/hammer.config';
import { HeaderModule } from '@layout/header/header.module';
import { MinWidthComponent } from '@layout/min-width/min-width.component';

@NgModule({
  declarations: [
    AppComponent,
    MinWidthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    CoreModule,
    HeaderModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
