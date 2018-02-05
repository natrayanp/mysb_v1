import { TestBed, inject } from '@angular/core/testing';

import { UserstateService } from './userstate.service';

describe('UserstateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserstateService]
    });
  });

  it('should be created', inject([UserstateService], (service: UserstateService) => {
    expect(service).toBeTruthy();
  }));
});
