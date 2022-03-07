import { TestBed } from '@angular/core/testing';

import { MoozoService } from './moozo.service';

describe('MoozoService', () => {
  let service: MoozoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoozoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
