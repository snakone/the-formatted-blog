import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { fromEvent, throttleTime, tap, filter, from } from 'rxjs';

@Directive({selector: '[StickyNav]'})

export class NavDirective implements AfterViewInit {

  @Output() scrolled = new EventEmitter<boolean>();
  scroll = 0;
  
  constructor(
    private el: ElementRef,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.stickyNavbar();
    this.showNavOnNavigation();
  }

  private stickyNavbar(): void {
    fromEvent(window, 'scroll')
     .pipe(
       throttleTime(100),
       tap(_ => setTimeout(() => this.scrolled.emit(true), 100))
     )
      .subscribe(_ => {
        const current = window.pageYOffset;
        const css = this.el?.nativeElement.classList || null;
        this.checkScroll(css, current);
        this.scroll = current;
    });
  }

  private checkScroll(
    css: DOMTokenList, 
    current: number
  ): void {
    if (current <= 0) { return; }

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
     ).subscribe(_ => this.el.nativeElement.classList
                       .remove('scroll-down'));
  }

}
