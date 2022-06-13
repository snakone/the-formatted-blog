import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { takeUntil, distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';

@Directive({selector: '[TopDirective]'})

export class TopDirective implements AfterViewInit, OnDestroy {

  displayed = false;
  b = this.el.nativeElement;  // Button
  limit = 800;
  private unsubscribe$ = new Subject<void>();

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.listenScroll();
  }

  private listenScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe$),
        throttleTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => this.onScroll());
  }

  private onScroll(): void {
    try {
      const scroll = document.documentElement?.scrollTop || 0;
      if (scroll > this.limit && this.displayed) { return; }
      if (scroll < this.limit && !this.displayed) { return; }
      this.manageCSS(scroll > this.limit)
    } catch (err) { console.log(err); }
  }

  private manageCSS(scrolled: boolean): void {
    if (scrolled) {
        this.b.style.display = 'block';
        this.displayed = true;
        this.b.classList.remove('fadeOutRight');
        this.b.classList.add('fadeInRight');
    } else { 
        this.displayed = false;
        this.b.classList.remove('fadeInRight');
        this.b.classList.add('fadeOutRight');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}