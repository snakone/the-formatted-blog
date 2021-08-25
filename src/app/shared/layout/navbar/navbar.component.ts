import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';
import { from, fromEvent, throttleTime } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { StickyService } from '@services/sticky/sticky.service';
import { NavigationEnd, Router } from '@angular/router';

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
    'fab fa-facebook-f',
    'fab fa-twitter',
    'fab fa-instagram',
    'fab fa-pinterest',
    'fab fa-dribbble'
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
    private router: Router
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
        if (current <= 20) { return; }

        if (
            this.el && (current > this.scroll) &&
           !this.el.classList.contains('scroll-down')
           ) {
            this.el.classList.add('scroll-down');
        }

        if (this.el && current < this.scroll) {
          this.el.classList.remove('scroll-down');
        }
        this.scroll = current;
    });
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
