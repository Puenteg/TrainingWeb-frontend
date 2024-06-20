import { TestBed } from '@angular/core/testing';

import { RutinasServiceService } from './rutinas-service.service';

describe('RutinasServiceService', () => {
  let service: RutinasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutinasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
