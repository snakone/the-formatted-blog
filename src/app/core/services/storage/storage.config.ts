import { InjectionToken } from '@angular/core';
import { SETTINGS_KEY, STORAGE_KEY, TOKEN_KEY, USER_ID_KEY } from '@shared/data/constants';
import { UserSettings } from '@shared/types/class.types';

export interface ModuleConfig {
  KEY: string;
}

export interface StorageConfig extends ModuleConfig {
  TOKEN: string | undefined;
  SETTINGS: UserSettings;
}

export const STORAGE_CONSTANTS: StorageConfig = {
  KEY: STORAGE_KEY,
  TOKEN: undefined,
  SETTINGS: new UserSettings()
};

export class Storage {
  [TOKEN_KEY]: string;
  [USER_ID_KEY]: string;
  [SETTINGS_KEY]: UserSettings;

  constructor() {
    this[SETTINGS_KEY] = new UserSettings();
  }
}

export let STORAGE_CONFIG = new InjectionToken<StorageConfig>('storage.config');
