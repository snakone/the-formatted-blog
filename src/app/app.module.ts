import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { CoreModule } from '@core/core.module';
import { LayoutModule } from '@layout/layout.module';
import { AppComponent } from './app.component';
import { RoutingModule } from './app.routing';
import { APP_CONFIG, APP_CONSTANTS } from './app.config';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RoutingModule,
    CoreModule,
    LayoutModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
  ],
  providers: [{ provide: APP_CONFIG, useValue: APP_CONSTANTS }]
})

export class AppModule { }
