import { TestBed, inject } from '@angular/core/testing';

import { SetjwtService } from './setjwtservice.service';

describe('SetjwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetjwtService]
    });
  });

  it('should be created', inject([SetjwtService], (service: SetjwtService) => {
    expect(service).toBeTruthy();
  }));
});
