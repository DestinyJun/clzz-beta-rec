import { TestBed, inject } from '@angular/core/testing';

import { InfoStatusService } from './info-status.service';

describe('InfoStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfoStatusService]
    });
  });

  it('should be created', inject([InfoStatusService], (service: InfoStatusService) => {
    expect(service).toBeTruthy();
  }));
});
