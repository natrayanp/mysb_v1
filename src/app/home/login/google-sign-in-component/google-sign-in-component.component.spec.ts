import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSignInComponentComponent } from './google-sign-in-component.component';

describe('GoogleSignInComponentComponent', () => {
  let component: GoogleSignInComponentComponent;
  let fixture: ComponentFixture<GoogleSignInComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleSignInComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSignInComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
