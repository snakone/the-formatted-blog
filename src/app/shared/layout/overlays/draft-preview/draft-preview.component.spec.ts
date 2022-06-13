import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPreviewComponent } from './draft-preview.component';

describe('DraftPreviewComponent', () => {
  let component: DraftPreviewComponent;
  let fixture: ComponentFixture<DraftPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
