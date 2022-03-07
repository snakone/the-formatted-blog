import { InjectionToken } from '@angular/core';

export interface ModuleConfig {
  KEY: string;
}

export interface StorageConfig extends ModuleConfig {
  THEME: string;
  TOKEN: string | undefined;
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: 'storage',
  THEME: 'light',
  TOKEN: undefined
};

export class Storage {
  [key: string]: string | undefined;
}

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
