import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyAsideComponent } from './sticky-aside.component';

describe('StickyAsideComponent', () => {
  let component: StickyAsideComponent;
  let fixture: ComponentFixture<StickyAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
