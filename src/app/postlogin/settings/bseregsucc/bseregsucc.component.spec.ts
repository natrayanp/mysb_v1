import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BseregsuccComponent } from './bseregsucc.component';

describe('BseregsuccComponent', () => {
  let component: BseregsuccComponent;
  let fixture: ComponentFixture<BseregsuccComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BseregsuccComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BseregsuccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
