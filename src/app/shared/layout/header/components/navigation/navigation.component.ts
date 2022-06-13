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
  t = 0;  // Time
  d = 300;  // Distance

  constructor() { }

  ngAfterViewInit(): void {
    this.el = document.getElementById('pan-nav');
  }

  public panned(e: Event): void {
    if (window.innerWidth > 1199) { return; }
    const event = (e as unknown) as HammerInput;
    this.t += (event.deltaX * -.09);

    if (this.t <= 0) { this.t = 0; }
    if (this.t >= 700) { this.t = 700; }
    if (this.el) { this.el.scrollLeft = this.t; }
  }

  public move(next: boolean): void {
    if (this.el) {
      next ? 
      (this.el.scrollLeft += this.d, this.t += this.d) : 
      (this.el.scrollLeft -= this.d, this.t -= this.d)
    }
  }

}
