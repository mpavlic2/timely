import { TestBed } from '@angular/core/testing';

import { NgtimelyserviceService } from './ngtimelyservice.service';

describe('NgtimelyserviceService', () => {
  let service: NgtimelyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgtimelyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
