import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPostSkeletonComponent } from './recent-post-skeleton.component';

describe('RecentPostSkeletonComponent', () => {
  let component: RecentPostSkeletonComponent;
  let fixture: ComponentFixture<RecentPostSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentPostSkeletonComponent]
    });
    fixture = TestBed.createComponent(RecentPostSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
