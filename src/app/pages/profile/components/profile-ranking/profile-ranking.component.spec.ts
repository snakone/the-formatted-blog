import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRankingComponent } from './profile-ranking.component';

describe('ProfileRankingComponent', () => {
  let component: ProfileRankingComponent;
  let fixture: ComponentFixture<ProfileRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
