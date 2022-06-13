import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent {
  
  @Input() instance: PaginationInstance;

  constructor() { }

}
