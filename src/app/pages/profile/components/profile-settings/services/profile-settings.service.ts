import { Injectable, WritableSignal, signal } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { UserSettings } from '@shared/types/class.types';

@Injectable()

export class ProfileSettingsService {

  public settingsState: WritableSignal<UserSettings>;

  constructor(ls: StorageService) {
    this.settingsState = signal(ls.getSettings()) as WritableSignal<UserSettings>;
  }
}
