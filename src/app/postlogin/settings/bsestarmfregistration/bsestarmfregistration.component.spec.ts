import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsestarmfregistrationComponent } from './bsestarmfregistration.component';

describe('BsestarmfregistrationComponent', () => {
  let component: BsestarmfregistrationComponent;
  let fixture: ComponentFixture<BsestarmfregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsestarmfregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsestarmfregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
