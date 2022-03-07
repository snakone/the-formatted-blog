import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PostComponent implements OnInit {

  text = NOTIFICATION_TEXT;

  constructor() { }

  ngOnInit(): void { }

  public notification(): void {
    console.log('home');
  }

}
