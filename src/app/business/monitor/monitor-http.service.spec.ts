import { TestBed, inject } from '@angular/core/testing';

import { MonitorHttpService } from './monitor-http.service';

describe('MonitorHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorHttpService]
    });
  });

  it('should be created', inject([MonitorHttpService], (service: MonitorHttpService) => {
    expect(service).toBeTruthy();
  }));
});
