import { InjectionToken } from '@angular/core';

export interface CoreModuleConfig {
  WEBSTORAGE_CONFIG: IWebstorageConfig;
}

export const CORE_MODULE_CONSTANTS: CoreModuleConfig = {
  WEBSTORAGE_CONFIG: {
    prefix: 'formatted-blog',
    separator: '.',
    caseSensitive: false
  }
};

interface IWebstorageConfig {
  prefix: string;
  separator: string;
  caseSensitive: boolean;
}

export let CORE_MODULE_CONFIG = new InjectionToken<CoreModuleConfig>('core.module.config');
