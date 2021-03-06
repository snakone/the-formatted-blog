import {
  Directive,
  OnDestroy,
  AfterViewInit,
  Input
} from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { StickyService } from '@services/sticky/sticky.service';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[Sticky]'})

export class StickyDirective implements AfterViewInit {

  @Input() selector: string | undefined;

  constructor(private stickySrv: StickyService) { }

  ngAfterViewInit(): void {
    this.subscribeToResize();
    window.dispatchEvent(new Event('resize'));
  }

  private subscribeToResize(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(500),
        map(_ => (window.document.body.clientWidth < 992) ?? true),
        distinctUntilChanged(),
      )
    .subscribe(_ => _ ? (
      this.stickySrv.destroy()
    ) : this.stickySrv.startSticky(this.selector || ''));
  }

}
