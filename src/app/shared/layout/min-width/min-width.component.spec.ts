import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinWidthComponent } from './min-width.component';

describe('MinWidthComponent', () => {
  let component: MinWidthComponent;
  let fixture: ComponentFixture<MinWidthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinWidthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinWidthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
