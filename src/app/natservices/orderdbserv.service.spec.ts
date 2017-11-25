import { TestBed, inject } from '@angular/core/testing';

import { OrderdbservService } from './orderdbserv.service';

describe('OrderdbservService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderdbservService]
    });
  });

  it('should be created', inject([OrderdbservService], (service: OrderdbservService) => {
    expect(service).toBeTruthy();
  }));
});
