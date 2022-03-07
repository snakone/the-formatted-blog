import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DUMMY_POST } from '@shared/data/data';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeContentComponent implements OnInit {

  items!: Post[];

  constructor() { }

  ngOnInit(): void {
    this.items = DUMMY_POST;
  }

}
