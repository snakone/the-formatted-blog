import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostSidebarComponent } from './profile-post-sidebar.component';

describe('ProfilePostSidebarComponent', () => {
  let component: ProfilePostSidebarComponent;
  let fixture: ComponentFixture<ProfilePostSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePostSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
