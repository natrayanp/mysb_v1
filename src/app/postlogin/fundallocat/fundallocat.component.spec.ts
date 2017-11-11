import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundallocatComponent } from './fundallocat.component';

describe('FundallocatComponent', () => {
  let component: FundallocatComponent;
  let fixture: ComponentFixture<FundallocatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundallocatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundallocatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
