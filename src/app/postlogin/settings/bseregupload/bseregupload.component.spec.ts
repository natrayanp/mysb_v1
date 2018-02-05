import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsereguploadComponent } from './bseregupload.component';

describe('BsereguploadComponent', () => {
  let component: BsereguploadComponent;
  let fixture: ComponentFixture<BsereguploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsereguploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsereguploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
