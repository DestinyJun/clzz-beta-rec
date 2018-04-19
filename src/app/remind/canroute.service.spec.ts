import { TestBed, inject } from '@angular/core/testing';

import { CanrouteService } from './canroute.service';

describe('CanrouteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanrouteService]
    });
  });

  it('should be created', inject([CanrouteService], (service: CanrouteService) => {
    expect(service).toBeTruthy();
  }));
});
