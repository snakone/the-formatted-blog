import { TestBed } from '@angular/core/testing';

import { PublicProfileGuard } from './public-profile.guard';

describe('PublicProfileGuard', () => {
  let guard: PublicProfileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublicProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
