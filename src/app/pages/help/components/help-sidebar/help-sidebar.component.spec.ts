import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSidebarComponent } from './help-sidebar.component';

describe('HelpSidebarComponent', () => {
  let component: HelpSidebarComponent;
  let fixture: ComponentFixture<HelpSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
