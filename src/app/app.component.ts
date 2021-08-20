import { Component } from '@angular/core';

import { StorageService } from '@core/services/storage/storage.service';
import { NO_WIDTH } from '@shared/data/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {



  constructor(private ls: StorageService) {
    this.checkTheme();
  }

  private checkTheme(): void {
    if (this.ls.get('theme') === 'dark') {
      document.body.classList.toggle('dark');
    }
  }

}
