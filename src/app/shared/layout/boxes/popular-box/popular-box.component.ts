import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-box',
  templateUrl: './popular-box.component.html',
  styleUrls: ['./popular-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularBoxComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 20,
    lazyLoad: true,
    responsiveRefreshRate: 100,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      992: {
        items: 1
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
