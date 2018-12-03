import { TestBed, inject } from '@angular/core/testing';

import { TemperatureIntervalService } from './temperature-interval.service';

describe('TemperatureIntervalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemperatureIntervalService]
    });
  });

  it('should be created', inject([TemperatureIntervalService], (service: TemperatureIntervalService) => {
    expect(service).toBeTruthy();
  }));
});
