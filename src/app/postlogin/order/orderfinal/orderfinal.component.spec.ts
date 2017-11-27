import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderfinalComponent } from './orderfinal.component';

describe('OrderfinalComponent', () => {
  let component: OrderfinalComponent;
  let fixture: ComponentFixture<OrderfinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderfinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderfinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
