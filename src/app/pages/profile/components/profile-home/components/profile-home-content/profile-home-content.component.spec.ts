import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHomeContentComponent } from './profile-home-content.component';

describe('ProfileHomeContentComponent', () => {
  let component: ProfileHomeContentComponent;
  let fixture: ComponentFixture<ProfileHomeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHomeContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
