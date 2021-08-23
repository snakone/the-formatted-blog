import { Component } from '@angular/core';

@Component({
  selector: 'app-slogan',
  templateUrl: './slogan.component.html',
  styleUrls: ['./slogan.component.scss']
})

export class SloganComponent {

  title = 'The Formatted Blog';
  slogan = 'For Real Experiences';

  constructor() { }

}
