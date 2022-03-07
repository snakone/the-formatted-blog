import { Component } from '@angular/core';

import { UsersFacade } from '@core/ngrx/users/users.facade';
import { PWAService } from '@services/pwa/pwa.service';
import { StorageService } from '@services/storage/storage.service';

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
    if (this.ls.get('theme') === 'dark') {
      document.body.classList.toggle('dark');
    }
  }

  private checkToken(): void {
    if (this.ls.get('token')) { this.userFcd.verifyToken(); }
  }

}
