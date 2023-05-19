import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftContentComponent } from './draft-content.component';

describe('DraftContentComponent', () => {
  let component: DraftContentComponent;
  let fixture: ComponentFixture<DraftContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
