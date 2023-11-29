import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSidebarComponent } from './draft-sidebar.component';

describe('DraftSidebarComponent', () => {
  let component: DraftSidebarComponent;
  let fixture: ComponentFixture<DraftSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
