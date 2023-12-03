import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIndexSkeletonComponent } from './post-index-skeleton.component';

describe('PostIndexSkeletonComponent', () => {
  let component: PostIndexSkeletonComponent;
  let fixture: ComponentFixture<PostIndexSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostIndexSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostIndexSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
