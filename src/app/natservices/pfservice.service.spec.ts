import { TestBed, inject } from '@angular/core/testing';
import { PfserviceService } from './pfservice.service';

describe('PfserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PfserviceService]
    });
  });

  it('should be created', inject([PfserviceService], (service: PfserviceService) => {
    expect(service).toBeTruthy();
  }));
});
