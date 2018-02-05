import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticommComponent } from './noticomm.component';

describe('NoticommComponent', () => {
  let component: NoticommComponent;
  let fixture: ComponentFixture<NoticommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
