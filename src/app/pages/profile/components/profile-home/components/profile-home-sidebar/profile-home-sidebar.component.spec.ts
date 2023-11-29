import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHomeSidebarComponent } from './profile-home-sidebar.component';

describe('ProfileHomeSidebarComponent', () => {
  let component: ProfileHomeSidebarComponent;
  let fixture: ComponentFixture<ProfileHomeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHomeSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileHomeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
