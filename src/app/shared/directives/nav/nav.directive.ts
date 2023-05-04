import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent, throttleTime, tap, filter, from } from 'rxjs';

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
        this.checkScroll(this.css, window.pageYOffset);
        this.scroll = window.pageYOffset;
    });
  }

  private checkScroll(
    css: DOMTokenList, 
    current: number
  ): void {
    // NAV HEIGHT
    if (current <= 48 && css.contains('scroll-down')) { 
      css.remove('scroll-down');
      return;
    }

    if (css && (current > this.scroll) &&
       !css.contains('scroll-down')
       ) { css.add('scroll-down'); }

    if (css && current < this.scroll) { 
      css.remove('scroll-down'); 
    }
  }

  private showNavOnNavigation(): void {
    from(this.router.events)
     .pipe(
      filter((e): e is NavigationEnd => (
        e instanceof NavigationEnd && !!this.el
      )),
     ).subscribe(_ => 
      (
        this.el.nativeElement.classList.remove('scroll-down'),
        setTimeout(() => window.dispatchEvent(new Event('resize')), 333)  // STICKY FIX
      )
    );
  }

}
