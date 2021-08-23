import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularBoxComponent } from './popular-box.component';

describe('PopularBoxComponent', () => {
  let component: PopularBoxComponent;
  let fixture: ComponentFixture<PopularBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
