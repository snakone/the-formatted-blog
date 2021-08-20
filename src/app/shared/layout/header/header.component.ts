import { Component, OnInit } from '@angular/core';
import { StorageService } from '@core/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  show = false;

  icons = [
    'fab fa-facebook-f',
    'fab fa-twitter',
    'fab fa-instagram',
    'fab fa-pinterest',
    'fab fa-dribbble'
  ];

  constructor(private ls: StorageService) { }

  ngOnInit(): void { }

  public theme(): void {
    const res = document.body.classList.toggle('dark');
    this.ls.setKey('theme', res ? 'dark' : 'light');
  }

}
