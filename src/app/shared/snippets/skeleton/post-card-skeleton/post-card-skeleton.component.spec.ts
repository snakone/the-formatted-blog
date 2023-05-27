import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardSkeletonComponent } from './post-card-skeleton.component';

describe('PostCardSkeletonComponent', () => {
  let component: PostCardSkeletonComponent;
  let fixture: ComponentFixture<PostCardSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostCardSkeletonComponent]
    });
    fixture = TestBed.createComponent(PostCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
