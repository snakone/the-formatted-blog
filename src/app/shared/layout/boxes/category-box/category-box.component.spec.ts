import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBoxComponent } from './category-box.component';

describe('CategoryBoxComponent', () => {
  let component: CategoryBoxComponent;
  let fixture: ComponentFixture<CategoryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
