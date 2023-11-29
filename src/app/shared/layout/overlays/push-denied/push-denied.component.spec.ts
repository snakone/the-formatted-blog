import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushDeniedDialogComponent } from './push-denied.component';

describe('PushDeniedDialogComponent', () => {
  let component: PushDeniedDialogComponent;
  let fixture: ComponentFixture<PushDeniedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushDeniedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushDeniedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
