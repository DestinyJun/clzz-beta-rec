import { TestBed, inject } from '@angular/core/testing';

import { LoginIdService } from './login-id.service';

describe('LoginIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginIdService]
    });
  });

  it('should be created', inject([LoginIdService], (service: LoginIdService) => {
    expect(service).toBeTruthy();
  }));
});
