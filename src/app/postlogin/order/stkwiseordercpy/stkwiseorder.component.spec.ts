import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StkwiseorderComponent } from './stkwiseorder.component';

describe('StkwiseorderComponent', () => {
  let component: StkwiseorderComponent;
  let fixture: ComponentFixture<StkwiseorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StkwiseorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StkwiseorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
