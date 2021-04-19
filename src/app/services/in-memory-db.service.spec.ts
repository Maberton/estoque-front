import { TestBed } from '@angular/core/testing';

import { InMemoryDb } from './in-memory-db.service';

describe('InMemoryDb', () => {
  let service: InMemoryDb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
