import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, distinctUntilChanged, filter, map } from 'rxjs';

@Component({
  selector: 'app-footer-gallery',
  templateUrl: './footer-gallery.component.html',
  styleUrls: ['./footer-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterGalleryComponent {

  items = [
    '20-img.jpg',
    '21-img.jpg',
    '22-img.jpg',
    '24-img.jpg',
    '23-img.jpg',
    '19-img.jpg'
  ];

  route$: Observable<boolean>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.route$ = this.router.events.pipe(
                    filter(ev => ev instanceof NavigationEnd), 
                    map((ev: NavigationEnd) => ev.url.includes('/create')),
                    distinctUntilChanged()
                  )
  }

}
