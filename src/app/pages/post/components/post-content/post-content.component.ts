import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DUMMY_POST } from '@shared/data/data';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostContentComponent {

  item = DUMMY_POST[0];

  constructor() { }

}
