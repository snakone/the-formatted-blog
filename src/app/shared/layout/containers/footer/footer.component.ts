import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APP_CONSTANTS } from 'app/app.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent {

  year: string | undefined;
  version: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.year = this.getYear();
    this.version = APP_CONSTANTS.APP_VERSION;
  }

  private getYear(): string {
    return new Date().getFullYear().toString();
  }

}
