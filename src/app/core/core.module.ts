import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CORE_MODULE_CONFIG, CORE_MODULE_CONSTANTS } from './core.module.config';
import { HammerConfig } from './hammer.config';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { HttpService } from './services/http/http.service';
import { StorageModule } from './services/storage/storage.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './ngrx/ngrx.index';
import { UserEffects } from './ngrx/users/users.effects';
import { JwtInterceptor } from './services/http/jwt.interceptor';

@NgModule({
  imports: [
    StorageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(CORE_MODULE_CONSTANTS.WEBSTORAGE_CONFIG),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    StoreModule.forFeature('AppState', reducers),
    EffectsModule.forRoot([
      UserEffects,
    ])
  ],
  providers: [
    HttpService,
    { provide: CORE_MODULE_CONFIG, useValue: CORE_MODULE_CONSTANTS },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
