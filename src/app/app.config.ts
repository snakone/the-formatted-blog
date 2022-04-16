import { InjectionToken } from "@angular/core";

const APP_VERSION = '0.0.5';
export const URI = 'https://formatted-blog.netlify.app/';

export interface AppConfig {
  TITLE: string;
  APP_VERSION: string;
}

export const APP_CONSTANTS: AppConfig = {
  TITLE: 'Formatted Blog',
  APP_VERSION,
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');