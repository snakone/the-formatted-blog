import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDraftComponent } from './admin-draft.component';

describe('AdminDraftComponent', () => {
  let component: AdminDraftComponent;
  let fixture: ComponentFixture<AdminDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
