import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterComponent implements OnInit {

  year: string | undefined;
  version: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.year = this.getYear();
    this.version = environment.version;
  }

  private getYear(): string {
    return new Date().getFullYear().toString();
  }

}
