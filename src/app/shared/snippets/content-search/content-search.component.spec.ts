import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSearchComponent } from './content-search.component';

describe('ContentSearchComponent', () => {
  let component: ContentSearchComponent;
  let fixture: ComponentFixture<ContentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
