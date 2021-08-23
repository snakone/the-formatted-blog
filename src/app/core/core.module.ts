import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { CORE_MODULE_CONFIG, CORE_MODULE_CONSTANTS } from './core.module.config';
import { StorageModule } from './services/storage/storage.module';

@NgModule({
  imports: [
    StorageModule,
    NgxWebstorageModule.forRoot(CORE_MODULE_CONSTANTS.WEBSTORAGE_CONFIG),

  ],
  providers: [
    { provide: CORE_MODULE_CONFIG, useValue: CORE_MODULE_CONSTANTS },
  ],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
