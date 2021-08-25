import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer-nav',
  templateUrl: './footer-nav.component.html',
  styleUrls: ['./footer-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FooterNavComponent implements OnInit {

  icons = [
    'fab fa-facebook-f',
    'fab fa-twitter',
    'fab fa-instagram',
    'fab fa-pinterest',
    'fab fa-dribbble'
  ];

  constructor() { }

  ngOnInit(): void { }

}
