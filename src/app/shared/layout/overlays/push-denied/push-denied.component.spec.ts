import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushDeniedOverlayComponent } from './push-denied.component';

describe('PushDeniedOverlayComponent', () => {
  let component: PushDeniedOverlayComponent;
  let fixture: ComponentFixture<PushDeniedOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushDeniedOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushDeniedOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
