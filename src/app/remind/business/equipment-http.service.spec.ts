import { TestBed, inject } from '@angular/core/testing';

import { EquipmentHttpService } from './equipment-http.service';

describe('EquipmentHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentHttpService]
    });
  });

  it('should be created', inject([EquipmentHttpService], (service: EquipmentHttpService) => {
    expect(service).toBeTruthy();
  }));
});
