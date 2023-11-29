import {
  Directive,
  Input,
  AfterContentInit,
  OnDestroy
} from '@angular/core';

import { Subject, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, throttleTime } from 'rxjs/operators';
import { StickyService } from '@services/sticky/sticky.service';
import { RESIZE_EVENT } from '@shared/data/constants';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[Sticky]'})

export class StickyDirective implements AfterContentInit, OnDestroy {

  @Input() selector: string | undefined;
  private unsubscribe$ = new Subject<void>();

  constructor(private stickySrv: StickyService) { }

  ngAfterContentInit(): void {
    this.subscribeToResize();
    setTimeout(() => {
      window.dispatchEvent(new Event(RESIZE_EVENT));
    }, 1500);
  }

  private subscribeToResize(): void {
    fromEvent(window, RESIZE_EVENT)
      .pipe(
        takeUntil(this.unsubscribe$),
        throttleTime(300),
        filter(_ => !!this.selector),
        map(_ => this.clientSize()),
        distinctUntilChanged(),
      )
    .subscribe(_ => _ ? 
      this.stickySrv.destroy() : 
      this.stickySrv.startSticky(this.selector || ''));
  }

  private clientSize(): boolean {
    return (
      window.document.body.clientWidth <= 983 ||
      document.getElementById('sticky-wrapper')!.clientHeight <= 500
    )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.stickySrv.destroy();
    this.selector = undefined;
  }

}
