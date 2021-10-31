import { Component } from '@angular/core';
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
  ) {
    this.checkTheme();
    this.checkPWA();
  }

  private checkTheme(): void {
    if (this.ls.get('theme') === 'dark') {
      document.body.classList.toggle('dark');
    }
  }

  private checkPWA(): void {
    this.pwa.updateSW();
  }

}
