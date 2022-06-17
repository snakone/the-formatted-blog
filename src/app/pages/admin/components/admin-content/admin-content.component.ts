import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '@shared/types/interface.types';

@Component({
  selector: 'app-admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AdminContentComponent implements OnInit {

  @Input() drafts: Post[] | undefined;

  constructor() { }

  ngOnInit(): void {}

}
