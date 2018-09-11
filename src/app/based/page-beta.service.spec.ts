import { TestBed, inject } from '@angular/core/testing';

import { PageBetaService } from './page-beta.service';

describe('PageBetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PageBetaService]
    });
  });

  it('should be created', inject([PageBetaService], (service: PageBetaService) => {
    expect(service).toBeTruthy();
  }));
});
