import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFriendsContentComponent } from './profile-friends-content.component';

describe('ProfileFriendsContentComponent', () => {
  let component: ProfileFriendsContentComponent;
  let fixture: ComponentFixture<ProfileFriendsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFriendsContentComponent]
    });
    fixture = TestBed.createComponent(ProfileFriendsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
