import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SKELETON_SENTENCE } from '@shared/data/sentences';

@Component({
  selector: 'app-home-skeleton',
  templateUrl: './home-skeleton.component.html',
  styleUrls: ['./home-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeSkeletonComponent implements OnInit {

  sentence = SKELETON_SENTENCE;

  constructor() { }

  ngOnInit(): void { }

}
