import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Post } from '@shared/types/interface.post';

@Component({
  selector: 'app-admin-draft-card',
  templateUrl: './admin-draft-card.component.html',
  styleUrls: ['./admin-draft-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminDraftCardComponent implements OnInit {

  @Input() draft: Post;

  constructor() { }

  ngOnInit(): void { }

}
