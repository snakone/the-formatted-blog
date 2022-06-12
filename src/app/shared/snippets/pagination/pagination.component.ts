import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
  
  @Input() instance: PaginationInstance;

  constructor() { }

  ngOnInit(): void { }

}
