import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit {

  @Input() slogan: boolean | undefined;
  show = false;
  scroll = 0;
  el: HTMLElement | undefined | null;
  mode: string | undefined;

  icons = [
    'fab fa-facebook-f',
    'fab fa-twitter',
    'fab fa-instagram',
    'fab fa-pinterest',
    'fab fa-dribbble'
  ];

  constructor(private ls: StorageService) { }

  ngAfterViewInit(): void {
    this.el = document.getElementById('nav');
  }

  ngOnInit(): void {
    this.stickyNavbar();
    this.mode = this.ls.get('theme');
  }

  private stickyNavbar(): void {
    fromEvent(window, 'scroll')
     .pipe(
       throttleTime(100)
     )
      .subscribe(_ => {
        const current = window.pageYOffset;
        if (current <= 20) { return; }

        if (this.el && current > this.scroll &&
           !this.el.classList.contains('scroll-down')) {
            this.el.classList.add('scroll-down');
        }

        if (this.el && current < this.scroll) {
          this.el.classList.remove('scroll-down');
        }
        this.scroll = current;
    });
  }

  public theme(): void {
    const res = document.body.classList.toggle('dark');
    res ? this.mode = 'dark' : this.mode = 'light';
    this.ls.setKey('theme', res ? 'dark' : 'light');
  }

}
