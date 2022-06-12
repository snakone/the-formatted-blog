import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackOverlayComponent } from './snack.component';

describe('SnackOverlayComponent', () => {
  let component: SnackOverlayComponent;
  let fixture: ComponentFixture<SnackOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
