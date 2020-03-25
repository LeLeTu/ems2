import { TestBed } from '@angular/core/testing';

import { EventstatusService } from './eventstatus.service';

describe('EventstatusService', () => {
  let service: EventstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
