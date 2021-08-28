import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
