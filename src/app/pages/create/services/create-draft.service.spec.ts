import { TestBed } from '@angular/core/testing';

import { CreateDraftService } from './create-draft.service';

describe('CreateDraftService', () => {
  let service: CreateDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
