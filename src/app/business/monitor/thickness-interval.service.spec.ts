import { TestBed, inject } from '@angular/core/testing';

import { ThicknessIntervalService } from './thickness-interval.service';

describe('ThicknessIntervalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThicknessIntervalService]
    });
  });

  it('should be created', inject([ThicknessIntervalService], (service: ThicknessIntervalService) => {
    expect(service).toBeTruthy();
  }));
});
