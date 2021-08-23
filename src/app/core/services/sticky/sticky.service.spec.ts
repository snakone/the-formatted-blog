import { TestBed } from '@angular/core/testing';

import { StickyService } from './sticky.service';

describe('StickyService', () => {
  let service: StickyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StickyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
