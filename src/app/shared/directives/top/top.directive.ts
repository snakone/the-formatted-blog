import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, distinctUntilChanged, throttleTime } from 'rxjs/operators';

@Directive({selector: '[Top]'})

export class TopDirective implements AfterViewInit, OnDestroy {

  displayed = false;
  button = this.el.nativeElement;
  private unsubscribe$ = new Subject<void>();
  scrollLimit = 800;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.listenScroll();
  }

  private listenScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.unsubscribe$),
        throttleTime(100),
        distinctUntilChanged()
      )
      .subscribe(() => this.onScroll());
  }

  private onScroll(): void {
    try {
      const scroll = document.documentElement.scrollTop;
      if (scroll > this.scrollLimit && this.displayed) { return; }
      this.manageCSS(scroll > this.scrollLimit)
    } catch (err) { console.log(err); }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private manageCSS(scrolled: boolean): void {
    if (scrolled) {
        this.button.style.display = 'block';
        this.displayed = true;
        this.button.classList.remove('fadeOutRight');
        this.button.classList.add('fadeInRight');
    } else { 
        this.displayed = false;
        this.button.classList.remove('fadeInRight');
        this.button.classList.add('fadeOutRight');
    }
  }

}