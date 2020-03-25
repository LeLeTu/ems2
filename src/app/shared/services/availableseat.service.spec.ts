import { TestBed } from '@angular/core/testing';

import { AvailableseatService } from './availableseat.service';

describe('AvailableseatService', () => {
  let service: AvailableseatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableseatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
