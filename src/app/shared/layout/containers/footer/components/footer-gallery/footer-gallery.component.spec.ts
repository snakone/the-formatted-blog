import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterGalleryComponent } from './footer-gallery.component';

describe('FooterGalleryComponent', () => {
  let component: FooterGalleryComponent;
  let fixture: ComponentFixture<FooterGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
