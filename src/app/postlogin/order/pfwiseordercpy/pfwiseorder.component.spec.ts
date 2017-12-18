import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfwiseorderComponent } from './pfwiseorder.component';

describe('PfwiseorderComponent', () => {
  let component: PfwiseorderComponent;
  let fixture: ComponentFixture<PfwiseorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfwiseorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfwiseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
