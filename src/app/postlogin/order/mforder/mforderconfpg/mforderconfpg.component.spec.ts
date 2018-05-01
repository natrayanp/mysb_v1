import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MforderconfpgComponent } from './mforderconfpg.component';

describe('MforderconfpgComponent', () => {
  let component: MforderconfpgComponent;
  let fixture: ComponentFixture<MforderconfpgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MforderconfpgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MforderconfpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
