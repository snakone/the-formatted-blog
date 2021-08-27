import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInOverlayComponent } from './log-in.component';

describe('LogInOverlayComponent', () => {
  let component: LogInOverlayComponent;
  let fixture: ComponentFixture<LogInOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
