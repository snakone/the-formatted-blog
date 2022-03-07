import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NavigationComponent implements AfterViewInit {

  items = [
    'Home', 'About us', 'Contact', 'Post Type', 
    'Lifestyle', 'Style & Beaty', 'Home & Living', 
    'Everyday life & Inspirations', 'Travel'
  ];

  el!: HTMLElement | null;
  total = 0;
  distance = 300;

  constructor() { }

  ngAfterViewInit(): void {
    this.el = document.getElementById('pan-nav');
  }

  public panned(e: Event): void {
    if (window.innerWidth > 730) { return; }
    const event = (e as unknown) as HammerInput;
    this.total += (event.deltaX * -.09);

    if (this.total <= 0) { this.total = 0; }
    if (this.total >= 700) { this.total = 700; }
    if (this.el) { this.el.scrollLeft = this.total; }
  }

  public move(next: boolean): void {
    if (this.el) {
      next ? (
        this.el.scrollLeft += this.distance,
        this.total += this.distance
      ) : (
        this.el.scrollLeft -= this.distance,
        this.total -= this.distance
      );
    }
  }

}
