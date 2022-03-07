import { Component, OnInit } from '@angular/core';
import { StorageService } from '@services/storage/storage.service';
import { StickyService } from '@services/sticky/sticky.service';
import { LogInOverlayComponent } from '../overlays/log-in/log-in.component';
import { CrafterService } from '@services/crafter/crafter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  showSearchBar = false;
  mode: string | undefined;
  menuOpened = false;

  icons = [
    { icon: 'fas fa-home', route: '/home' },
    { icon: 'fas fa-feather-alt', route: '/create' },
    { icon: 'far fa-file-alt', route: '/news' },
    // { icon: 'far fa-user', route: '/profile' },
    { icon: 'fas fa-question', route: '/profile' }

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
    private crafter: CrafterService
  ) { }

  ngOnInit(): void {
    this.mode = this.ls.get('theme');
  }

  public onScroll(ev: boolean): void {
    if (ev) {
      this.menuOpened ? (this.menuOpened = false) : null;
      this.stickySrv.checkSticky();
    }
  }

  public openModal(): void {
    this.crafter.dialog(LogInOverlayComponent);
  }

  public theme(): void {
    const res = document.body.classList.toggle('dark');
    res ? this.mode = 'dark' : this.mode = 'light';
    this.ls.setKey('theme', this.mode);
  }

}
