import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsSidebarComponent } from './profile-settings-sidebar.component';

describe('ProfileSettingsSidebarComponent', () => {
  let component: ProfileSettingsSidebarComponent;
  let fixture: ComponentFixture<ProfileSettingsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSettingsSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSettingsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
