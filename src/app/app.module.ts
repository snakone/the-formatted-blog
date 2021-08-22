import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { environment } from '@env/environment';
import { CoreModule } from '@core/core.module';
import { HammerConfig } from '@core/hammer.config';
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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    CoreModule,
    LayoutModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
