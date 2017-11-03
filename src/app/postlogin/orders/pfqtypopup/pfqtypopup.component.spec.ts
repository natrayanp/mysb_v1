import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfqtypopupComponent } from './pfqtypopup.component';

describe('PfqtypopupComponent', () => {
  let component: PfqtypopupComponent;
  let fixture: ComponentFixture<PfqtypopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfqtypopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfqtypopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
