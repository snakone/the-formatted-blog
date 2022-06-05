import {
  Directive,
  Input,
  AfterContentInit,
  OnDestroy
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, throttleTime } from 'rxjs/operators';
import { StickyService } from '@services/sticky/sticky.service';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[Sticky]'})

export class StickyDirective implements AfterContentInit, OnDestroy {

  @Input() selector: string | undefined;

  constructor(private stickySrv: StickyService) { }

  ngAfterContentInit(): void {
    this.subscribeToResize();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1500);
  }

  private subscribeToResize(): void {
    fromEvent(window, 'resize')
      .pipe(
        throttleTime(300),
        filter(_ => !!this.selector),
        map(_ => (window.document.body.clientWidth <= 983 ||
                  document.getElementById('sticky-wrapper')!.clientHeight <= 400) ?? true),
        distinctUntilChanged(),
      )
    .subscribe(_ => _ ? 
      this.stickySrv.destroy() : 
      this.stickySrv.startSticky(this.selector || ''));
  }

  ngOnDestroy() {
    this.stickySrv.destroy();
    this.selector = undefined;
  }

}
