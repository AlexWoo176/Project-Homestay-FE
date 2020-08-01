import { TestBed } from '@angular/core/testing';

import { StatusHouseService } from './status-house.service';

describe('StatusHouseService', () => {
  let service: StatusHouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusHouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
