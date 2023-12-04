import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSettingsContentComponent } from './profile-settings-content.component';

describe('ProfileSettingsContentComponent', () => {
  let component: ProfileSettingsContentComponent;
  let fixture: ComponentFixture<ProfileSettingsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSettingsContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileSettingsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
