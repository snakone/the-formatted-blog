import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PaginationControlsDirective, PaginationInstance } from 'ngx-pagination';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateSidebarComponent implements OnInit {

  @Input() drafts!: Post[] | null;
  p: PaginationControlsDirective;

  instance: PaginationInstance = {
    id: 'drafts',
    itemsPerPage: 5,
    currentPage: 1
  };

  constructor() { }

  ngOnInit(): void { }

}
