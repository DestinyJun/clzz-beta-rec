import { TestBed, inject } from '@angular/core/testing';

import { ScheduleHttpService } from './schedule-http.service';

describe('ScheduleHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleHttpService]
    });
  });

  it('should be created', inject([ScheduleHttpService], (service: ScheduleHttpService) => {
    expect(service).toBeTruthy();
  }));
});
