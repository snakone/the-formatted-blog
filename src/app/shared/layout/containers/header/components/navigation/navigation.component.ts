import { Component, ChangeDetectionStrategy, AfterViewInit, HostListener } from '@angular/core';

const distance = 300;
const minWidth = 1199; 

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
  panned = 0;
  minWidthPanned = 600;
  maxWidthPanned = 900;

  constructor() { }

  ngAfterViewInit(): void {
    this.el = document.getElementById('pan-nav');
  }

  @HostListener('pan', ['$event']) onPan(e: HammerInput): void {
    if (window.innerWidth > minWidth) { return; }
    const event = e as unknown as HammerInput;
    this.panned += event.deltaX * -0.09;
    this.panned = Math.max(0, Math.min(700, this.panned));

    if (this.el) {
      this.el.scrollLeft = this.panned;
    }
  }

  public move(next: boolean): void {
    if (this.el) {
      next ? 
      (this.el.scrollLeft += distance, this.panned += distance) : 
      (this.el.scrollLeft -= distance, this.panned -= distance)
    }
  }

}
