import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFriendsSidebarComponent } from './profile-friends-sidebar.component';

describe('ProfileFriendsSidebarComponent', () => {
  let component: ProfileFriendsSidebarComponent;
  let fixture: ComponentFixture<ProfileFriendsSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFriendsSidebarComponent]
    });
    fixture = TestBed.createComponent(ProfileFriendsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
