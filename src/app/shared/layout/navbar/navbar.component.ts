import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';
import { from, fromEvent, throttleTime } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { StickyService } from '@services/sticky/sticky.service';
import { NavigationEnd, Router } from '@angular/router';
import { LogInOverlayComponent } from '../overlays/log-in/log-in.component';
import { CrafterService } from '@services/crafter/crafter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, AfterViewInit {

  show = false;
  mode: string | undefined;
  scroll = 0;
  el: HTMLElement | undefined | null;
  menuOpened = false;

  icons = [
    { icon: 'fas fa-home', route: '/home' },
    { icon: 'fas fa-feather-alt', route: '/create' },
    { icon: 'far fa-file-alt', route: '/news' },
    // { icon: 'far fa-user', route: '/profile' },
    { icon: 'fas fa-question', route: '/help' }

  ];

  dropdown = [
    'Home',
    'About us',
    'Contact',
    'Travel',
    'Politics'
  ];

  constructor(
    private ls: StorageService,
    private stickySrv: StickyService,
    private router: Router,
    private crafter: CrafterService
  ) { }

  ngAfterViewInit(): void {
    this.el = document.getElementById('nav');
  }

  ngOnInit(): void {
    this.stickyNavbar();
    this.showOnNavigation();
    this.mode = this.ls.get('theme');
  }

  private stickyNavbar(): void {
    fromEvent(window, 'scroll')
     .pipe(
       throttleTime(100),
       tap(_ => setTimeout(() => (
         this.menuOpened = false,
         this.stickySrv.checkSticky()
        ), 100))
     )
      .subscribe(_ => {
        const current = window.pageYOffset;
        const css = this.el?.classList || null;

        if (current <= 20) { return; }

        if (
            css && (current > this.scroll) &&
           !css.contains('scroll-down')
           ) {
            css.add('scroll-down');
        }

        if (css && current < this.scroll) {
          css.remove('scroll-down');
        }
        this.scroll = current;
    });
  }

  public openModal(): void {
    this.crafter.dialog(LogInOverlayComponent);
  }

  private showOnNavigation(): void {
    from(this.router.events)
     .pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
     )
       .subscribe(_ => {
         if (this.el) this.el.classList.remove('scroll-down');
       });
  }

  public theme(): void {
    const res = document.body.classList.toggle('dark');
    res ? this.mode = 'dark' : this.mode = 'light';
    this.ls.setKey('theme', res ? 'dark' : 'light');
  }

}
