import { TestBed, inject } from '@angular/core/testing';

import { PositionNameService } from './position-name.service';

describe('PositionNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PositionNameService]
    });
  });

  it('should be created', inject([PositionNameService], (service: PositionNameService) => {
    expect(service).toBeTruthy();
  }));
});
