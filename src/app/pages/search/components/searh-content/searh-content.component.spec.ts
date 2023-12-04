import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhContentComponent } from './searh-content.component';

describe('SearhContentComponent', () => {
  let component: SearhContentComponent;
  let fixture: ComponentFixture<SearhContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearhContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearhContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
