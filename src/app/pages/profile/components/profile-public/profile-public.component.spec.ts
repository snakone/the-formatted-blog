import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePublicComponent } from './profile-public.component';

describe('ProfilePublicComponent', () => {
  let component: ProfilePublicComponent;
  let fixture: ComponentFixture<ProfilePublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePublicComponent]
    });
    fixture = TestBed.createComponent(ProfilePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
