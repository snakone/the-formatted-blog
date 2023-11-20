import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySkeletonComponent } from './activity-skeleton.component';

describe('ActivitySkeletonComponent', () => {
  let component: ActivitySkeletonComponent;
  let fixture: ComponentFixture<ActivitySkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitySkeletonComponent]
    });
    fixture = TestBed.createComponent(ActivitySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
