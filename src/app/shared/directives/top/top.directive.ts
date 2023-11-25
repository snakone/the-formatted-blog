import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { takeUntil, distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';

const limit = 800;
const addClass = 'fadeInRight';
const outClass = 'fadeOutRight'

@Directive({selector: '[TopDirective]'})

export class TopDirective implements AfterViewInit, OnDestroy {

  displayed = false;
  button = this.el.nativeElement;  // Button
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
      const scroll = window.scrollY || document.documentElement.scrollTop || 0;
      if ((scroll > limit && this.displayed) || (scroll < limit && !this.displayed)) {
        return;
      }
      this.manageCSS(scroll > limit);
    } catch (err) {
      console.error('Error al manejar el desplazamiento:', err);
    }
  }

  private manageCSS(scrolled: boolean): void {
    if (scrolled) {
        this.button.style.display = 'block';
        this.displayed = true;
        this.button.classList.remove(outClass);
        this.button.classList.add(addClass);
    } else { 
        this.displayed = false;
        this.button.classList.remove(addClass);
        this.button.classList.add(outClass);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}