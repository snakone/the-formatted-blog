import { Component } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';

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
