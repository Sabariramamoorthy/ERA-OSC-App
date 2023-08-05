import { TestBed } from '@angular/core/testing';

import { LogincheckService } from './logincheck.service';

describe('LogincheckService', () => {
  let service: LogincheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogincheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
