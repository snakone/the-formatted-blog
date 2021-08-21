import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-post',
  templateUrl: './main-post.component.html',
  styleUrls: ['./main-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainPostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
