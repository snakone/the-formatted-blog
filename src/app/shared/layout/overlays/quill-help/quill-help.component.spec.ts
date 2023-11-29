import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillHelpDialogComponent } from './quill-help.component';

describe('QuillHelpDialogComponent', () => {
  let component: QuillHelpDialogComponent;
  let fixture: ComponentFixture<QuillHelpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuillHelpDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillHelpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
