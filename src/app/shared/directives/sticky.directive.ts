import {
  Directive,
  OnDestroy,
  AfterViewInit,
  Input
} from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

declare const StickySidebar: any;

// tslint:disable-next-line:directive-selector
@Directive({selector: '[Sticky]'})

export class StickyDirective implements AfterViewInit, OnDestroy {

  @Input() selector: string | undefined;
  stickyEl: any | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor() { }

  ngAfterViewInit(): void {
    this.subscribeToResize();
    window.dispatchEvent(new Event('resize'));
  }

  private subscribeToResize(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        takeUntil(this.unsubscribe$),
        filter(res => !!res && this.stickyEl),
        map(_ => (window.document.body.clientWidth < 992) ?? true),
        distinctUntilChanged(),
      )
    .subscribe(_ => _ ? (
      this.stickyEl.destroy(),
      this.stickyEl = null
    ) : this.startSticky());
  }

  private startSticky(): void {
    if (!this.stickyEl) {
      this.stickyEl =  new StickySidebar('.sidebar', {
        topSpacing: 72,
        bottomSpacing: 20,
        resizeSensor: false,
        containerSelector: `.${this.selector}`,
        innerWrapperSelector: '.sidebar__inner'
      });
    }
  }

  ngOnDestroy(): void {
    if (this.stickyEl) this.stickyEl.destroy();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
