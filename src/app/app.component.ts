import { Component } from '@angular/core';

import { UsersFacade } from '@store/users/users.facade';
import { PWAService } from '@services/pwa/pwa.service';
import { StorageService } from '@services/storage/storage.service';

import { THEME_KEY, TOKEN_KEY } from '@shared/data/constants';
import { ThemeEnum } from '@shared/types/types.enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(
    private ls: StorageService,
    private pwa: PWAService,
    private userFcd: UsersFacade
  ) {
    this.checkTheme();
    this.checkToken();
    this.pwa.updateSW();
  }

  private checkTheme(): void {
    if (this.ls.getSettings(THEME_KEY) === ThemeEnum.DARK) {
      document.body.classList.toggle(ThemeEnum.DARK);
    }
  }

  private checkToken(): void {
    const token = this.ls.get(TOKEN_KEY);
    const autoLogin = this.ls.getSettings('autoLogin');
    if (token && autoLogin) { this.userFcd.verifyToken(); }
  }

}
