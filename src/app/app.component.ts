import { Component } from '@angular/core';

import { UsersFacade } from '@store/users/users.facade';
import { PWAService } from '@services/pwa/pwa.service';
import { StorageService } from '@services/storage/storage.service';

import { DARK_KEY, THEME_KEY, TOKEN_KEY } from '@shared/data/constants';

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
    if (this.ls.get(THEME_KEY) === DARK_KEY) {
      document.body.classList.toggle(DARK_KEY);
    }
  }

  private checkToken(): void {
    if (this.ls.get(TOKEN_KEY)) { this.userFcd.verifyToken(); }
  }

}
