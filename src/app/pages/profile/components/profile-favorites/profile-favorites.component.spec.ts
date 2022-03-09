import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavoritesComponent } from './profile-favorites.component';

describe('ProfileFavoritesComponent', () => {
  let component: ProfileFavoritesComponent;
  let fixture: ComponentFixture<ProfileFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFavoritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
