import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PostsFacade } from '@core/ngrx/posts/posts.facade';
import { Post } from '@shared/types/interface.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilePostsComponent implements OnInit {

  items$: Observable<Post[]>;

  constructor(private postFacade: PostsFacade) { }

  ngOnInit(): void {
    this.items$ = this.postFacade.filtered$;
  }

  ngOnDestroy() {
    this.postFacade.resetFilter();
  }

}
