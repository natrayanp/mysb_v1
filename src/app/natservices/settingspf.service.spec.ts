import { TestBed, inject } from '@angular/core/testing';

import { SettingspfService } from './settingspf.service';

describe('SettingspfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SettingspfService]
    });
  });

  it('should be created', inject([SettingspfService], (service: SettingspfService) => {
    expect(service).toBeTruthy();
  }));
});
