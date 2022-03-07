import { InjectionToken } from "@angular/core";
import * as fromUsers from '@store/users/users.reducer';

const APP_VERSION = '0.0.5';
export const URI = 'https://formatted-blog.netlify.app/';

export interface AppState {
  users: fromUsers.UserState;
}

export interface AppConfig {
  TITLE: string;
  APP_VERSION: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'Formatted Blog',
  APP_VERSION,
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');