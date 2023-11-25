import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent, tap, filter, from } from 'rxjs';

const NAV_HEIGHT = 48;
const RESIZE_DELAY = 333;
const SCROLL_CLASS = 'scroll-down'

@Directive({selector: '[StickyNav]'})

export class NavDirective implements AfterViewInit {

  @Output() scrolled = new EventEmitter<boolean>();
  scroll = 0;
  css!: DOMTokenList;
  
  constructor(
    private el: ElementRef,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.stickyNavbar();
    this.showNavOnNavigation();
    this.css = this.el?.nativeElement.classList || null;
  }

  private stickyNavbar(): void {
    fromEvent(window, 'scroll')
     .pipe(tap(_ => this.scrolled.emit(true)))
      .subscribe(_ => {
        this.checkScroll(this.css, window.scrollY);
        this.scroll = window.scrollY;
    });
  }

  private checkScroll(
    classList: DOMTokenList, 
    scrollY: number
  ): void {
    const shouldRemove = (scrollY <= NAV_HEIGHT && classList.contains(SCROLL_CLASS)) || scrollY < this.scroll;
    const shouldAdd = (scrollY > this.scroll) && !classList.contains(SCROLL_CLASS);

    if (shouldRemove) { 
      classList.remove(SCROLL_CLASS);
      return;
    }

    if (shouldAdd) { 
      classList.add(SCROLL_CLASS);
    }
  }

  private showNavOnNavigation(): void {
    from(this.router.events)
     .pipe(
      filter((e): e is NavigationEnd => (e instanceof NavigationEnd && !!this.el)),
      tap(_ => this.el.nativeElement.classList.remove(SCROLL_CLASS))
     ).subscribe(_ => setTimeout(() => window.dispatchEvent(new Event('resize')), RESIZE_DELAY));
  }

}
