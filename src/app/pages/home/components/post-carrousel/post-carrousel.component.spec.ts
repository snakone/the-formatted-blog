import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCarrouselComponent } from './post-carrousel.component';

describe('PostCarrouselComponent', () => {
  let component: PostCarrouselComponent;
  let fixture: ComponentFixture<PostCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCarrouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
