import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhSidebarComponent } from './searh-sidebar.component';

describe('SearhSidebarComponent', () => {
  let component: SearhSidebarComponent;
  let fixture: ComponentFixture<SearhSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearhSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearhSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
