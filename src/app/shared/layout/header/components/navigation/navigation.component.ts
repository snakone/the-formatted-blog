import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavigationComponent implements AfterViewInit {

  items = [
    'Home', 'About us', 'Contact', 'Post Type', 'Lifestyle',
    'Style & Beaty', 'Home & Living', 'Everyday life & Inspirations',
    'Travel', 'Games'
  ];

  el: HTMLElement | undefined | null;
  total = 0;

  constructor() { }

  ngAfterViewInit(): void {
    this.el = document.getElementById('pan-nav');
  }

  public panned(e: Event): void {
    if (window.innerWidth > 730) { return; }
    const event = (e as unknown) as HammerInput;
    this.total += (event.deltaX * -.03);

    if (this.total <= 0) { this.total = 0; }
    if (this.total >= 666) { this.total = 666; }
    if (this.el) { this.el.scrollLeft = this.total; }
  }

  public move(next: boolean): void {
    if (this.el) {
      next ? (
        this.el.scrollLeft += 100,
        this.total += 100
      ) : (
        this.el.scrollLeft -= 100,
        this.total -= 100
      );
    }
  }

}
