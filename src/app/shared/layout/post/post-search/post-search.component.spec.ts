import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchComponent } from './post-search.component';

describe('PostSearchComponent', () => {
  let component: PostSearchComponent;
  let fixture: ComponentFixture<PostSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
