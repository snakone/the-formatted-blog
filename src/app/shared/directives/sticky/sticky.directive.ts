import {
  Directive,
  AfterViewInit,
  Input
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, throttleTime } from 'rxjs/operators';
import { StickyService } from '@services/sticky/sticky.service';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[Sticky]'})

export class StickyDirective implements AfterViewInit {

  @Input() selector: string | undefined;

  constructor(private stickySrv: StickyService) { }

  ngAfterViewInit(): void {
    this.subscribeToResize();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  private subscribeToResize(): void {
    fromEvent(window, 'resize')
      .pipe(
        throttleTime(500),
        map(_ => (window.document.body.clientWidth < 992) ?? true),
        distinctUntilChanged(),
      )
    .subscribe(_ => _ ? (
      this.stickySrv.destroy()
    ) : this.stickySrv.startSticky(this.selector || ''));
  }

}
