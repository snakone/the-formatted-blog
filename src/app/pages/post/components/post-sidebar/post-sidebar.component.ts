import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-post-sidebar',
  templateUrl: './post-sidebar.component.html',
  styleUrls: ['./post-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
