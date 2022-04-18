import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillHelpComponent } from './quill-help.component';

describe('QuillHelpComponent', () => {
  let component: QuillHelpComponent;
  let fixture: ComponentFixture<QuillHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuillHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
