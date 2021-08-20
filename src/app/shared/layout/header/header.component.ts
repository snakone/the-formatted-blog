import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';
import { fromEvent, map, throttleTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  @Input() slogan: boolean | undefined;
  show = false;
  scroll = 0;

  icons = [
    'fab fa-facebook-f',
    'fab fa-twitter',
    'fab fa-instagram',
    'fab fa-pinterest',
    'fab fa-dribbble'
  ];

  constructor(private ls: StorageService) { }

  ngOnInit(): void {
    fromEvent(window, 'scroll')
     .pipe(
       throttleTime(100)
     )
      .subscribe(_ => {
        const current = window.pageYOffset;
        const el =  document.getElementsByTagName('nav')[0];
        if (current <= 32) { return; }

        if (current > this.scroll &&
           !el.classList.contains('scroll-down')) {
            el.classList.add('scroll-down');
        }

        if (current < this.scroll) {
           el.classList.remove('scroll-down');
       }
        this.scroll = current;
      });
  }

  public theme(): void {
    const res = document.body.classList.toggle('dark');
    this.ls.setKey('theme', res ? 'dark' : 'light');
  }

}
