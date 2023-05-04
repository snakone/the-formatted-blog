import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpHeaderComponent } from './help-header.component';

describe('HelpHeaderComponent', () => {
  let component: HelpHeaderComponent;
  let fixture: ComponentFixture<HelpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
