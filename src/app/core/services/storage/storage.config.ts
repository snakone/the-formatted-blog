import { InjectionToken } from '@angular/core';

export interface ModuleConfig {
  KEY: string;
}

export interface StorageConfig extends ModuleConfig {
  THEME: string;
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: 'storage',
  THEME: 'light',
};

export class Storage {
  [key: string]: string | undefined;
}

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
