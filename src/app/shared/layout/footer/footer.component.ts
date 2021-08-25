import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  today: string | undefined | null;

  constructor() { }

  ngOnInit(): void {
    this.today = this.getYear();
  }

  private getYear(): string {
    return new Date().getFullYear().toString();
  }

}
