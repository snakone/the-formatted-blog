import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPostBoxComponent } from './recent-post-box.component';

describe('RecentPostBoxComponent', () => {
  let component: RecentPostBoxComponent;
  let fixture: ComponentFixture<RecentPostBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentPostBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentPostBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
