import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDraftCardComponent } from './admin-draft-card.component';

describe('AdminDraftCardComponent', () => {
  let component: AdminDraftCardComponent;
  let fixture: ComponentFixture<AdminDraftCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDraftCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDraftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
