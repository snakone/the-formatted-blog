import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDraftsComponent } from './profile-drafts.component';

describe('ProfileDraftsComponent', () => {
  let component: ProfileDraftsComponent;
  let fixture: ComponentFixture<ProfileDraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDraftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
