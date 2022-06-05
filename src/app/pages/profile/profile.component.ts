import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { UsersFacade } from '@core/ngrx/users/users.facade';
import { LIKE_TEXT } from '@shared/data/sentences';
import { User } from '@shared/types/interface.types';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent implements OnInit, OnDestroy {

  text = LIKE_TEXT;
  $unsubscribe = new Subject<void>();

  constructor(
    private userFcd: UsersFacade,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.stickyFix();
  }

  private stickyFix(): void {
    this.route.events
    .pipe(
      filter((event) => event instanceof NavigationEnd && 
                        event.url.includes('/profile')
            ),
      takeUntil(this.$unsubscribe))
    .subscribe(_ => (
      this.scroll(),
      setTimeout(() => window.dispatchEvent(new Event('resize')), 200)
    )) 
  }

  public like(): void {
    console.log('profile');
  }

  private scroll(): void {
    const el = document.getElementById('profile-route');
    if (el && document.body.clientWidth <= 982) { el.scrollIntoView(); }
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
