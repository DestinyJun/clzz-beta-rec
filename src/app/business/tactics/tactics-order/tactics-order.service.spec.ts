import { TestBed, inject } from '@angular/core/testing';

import { TacticsOrderService } from './tactics-order.service';

describe('TacticsOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TacticsOrderService]
    });
  });

  it('should be created', inject([TacticsOrderService], (service: TacticsOrderService) => {
    expect(service).toBeTruthy();
  }));
});
