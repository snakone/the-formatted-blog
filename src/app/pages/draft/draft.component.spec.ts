import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftComponent } from './draft.component';

describe('DraftComponent', () => {
  let component: DraftComponent;
  let fixture: ComponentFixture<DraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
