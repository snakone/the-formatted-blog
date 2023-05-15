import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DraftsFacade } from '@store/drafts/drafts.facade';
import { Subject, debounceTime, filter, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class AdminComponent {

  private unsubscribe$ = new Subject<void>();

  constructor(private draftsFacade: DraftsFacade, private router: Router) { }

  ngOnInit(): void {
    this.draftsFacade.getAll();

    this.router.events.pipe(
      startWith(this.router),
      takeUntil(this.unsubscribe$),
      debounceTime(500),
      filter((_: any) =>
         _.routerEvent instanceof NavigationEnd &&
         _.routerEvent.url?.includes('#reload')),
    ).subscribe(_ => {
      this.draftsFacade.getAll();
    })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
