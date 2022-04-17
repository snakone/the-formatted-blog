import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { NOTIFICATION_TEXT } from '@shared/data/sentences';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  
  text = NOTIFICATION_TEXT;

  constructor() {}

  ngOnInit(): void { }

}
