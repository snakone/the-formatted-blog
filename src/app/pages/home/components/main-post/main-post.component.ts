import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class MainPostComponent implements OnInit {

  show = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.show = true, 500);
  }

}
