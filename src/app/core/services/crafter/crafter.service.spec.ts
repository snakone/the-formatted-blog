import { TestBed } from '@angular/core/testing';

import { CrafterService } from './crafter.service';

describe('CrafterService', () => {
  let service: CrafterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrafterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
