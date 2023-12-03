import {
  Directive,
  Input,
  DestroyRef
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, throttleTime } from 'rxjs/operators';
import { StickyService } from '@services/sticky/sticky.service';
import { RESIZE_EVENT } from '@shared/data/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({selector: '[Sticky]'})

export class StickyDirective {

  @Input() selector: string | undefined;

  constructor(private stickySrv: StickyService, private destroyRef: DestroyRef) { }

  ngAfterContentInit(): void {
    this.subscribeToResize();
    setTimeout(() => {
      window.dispatchEvent(new Event(RESIZE_EVENT));
    }, 3000);
  }

  private subscribeToResize(): void {
    fromEvent(window, RESIZE_EVENT)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
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
    this.stickySrv.destroy();
    this.selector = undefined;
  }

}
