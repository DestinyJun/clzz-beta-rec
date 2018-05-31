import { TestBed, inject } from '@angular/core/testing';

import { MaterialHttpService } from './material-http.service';

describe('MaterialHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialHttpService]
    });
  });

  it('should be created', inject([MaterialHttpService], (service: MaterialHttpService) => {
    expect(service).toBeTruthy();
  }));
});
