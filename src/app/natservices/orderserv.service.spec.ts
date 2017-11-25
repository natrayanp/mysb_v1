import { TestBed, inject } from '@angular/core/testing';

import { OrderservService } from './orderserv.service';

describe('OrderservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderservService]
    });
  });

  it('should be created', inject([OrderservService], (service: OrderservService) => {
    expect(service).toBeTruthy();
  }));
});
