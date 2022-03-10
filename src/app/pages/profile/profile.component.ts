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
  user$!: Observable<User | null>;
  $unsubscribe = new Subject<void>();

  constructor(
    private userFcd: UsersFacade,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.user$ = this.userFcd.user$;
    this.stickyFix();
  }

  private stickyFix(): void {
    this.route.events
    .pipe(
      filter((event) => event instanceof NavigationEnd && 
                        event.url.includes('/profile')),
      takeUntil(this.$unsubscribe))
    .subscribe(_ => window.dispatchEvent(new Event('resize')))
  }

  public like(): void {
    console.log('profile');
  }

  ngOnDestroy() {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

}
