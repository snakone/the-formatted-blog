import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsMasonryComponent } from './news-masonry.component';

describe('NewsMasonryComponent', () => {
  let component: NewsMasonryComponent;
  let fixture: ComponentFixture<NewsMasonryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsMasonryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
