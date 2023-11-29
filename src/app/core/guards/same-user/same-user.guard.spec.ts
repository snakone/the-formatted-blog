import { TestBed } from '@angular/core/testing';

import { SameUserGuard } from './same-user.guard';

describe('SameUserGuard', () => {
  let guard: SameUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SameUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
