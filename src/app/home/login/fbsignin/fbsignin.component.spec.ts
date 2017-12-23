import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbsigninComponent } from './fbsignin.component';

describe('FbsigninComponent', () => {
  let component: FbsigninComponent;
  let fixture: ComponentFixture<FbsigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbsigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbsigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
