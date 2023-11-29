import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftPreviewDialogComponent } from './draft-preview.component';

describe('DraftPreviewDialogComponent', () => {
  let component: DraftPreviewDialogComponent;
  let fixture: ComponentFixture<DraftPreviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftPreviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
