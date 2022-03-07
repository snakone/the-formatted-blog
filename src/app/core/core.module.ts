import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CORE_MODULE_CONFIG, CORE_MODULE_CONSTANTS } from './core.module.config';
import { HammerConfig } from './hammer.config';
import { StorageModule } from './services/storage/storage.module';

@NgModule({
  imports: [
    StorageModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(CORE_MODULE_CONSTANTS.WEBSTORAGE_CONFIG),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
  ],
  providers: [
    { provide: CORE_MODULE_CONFIG, useValue: CORE_MODULE_CONSTANTS },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
