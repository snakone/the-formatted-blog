import { TestBed } from '@angular/core/testing';

import { PWAService } from './pwa.service';

describe('PWAService', () => {
  let service: PWAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PWAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
