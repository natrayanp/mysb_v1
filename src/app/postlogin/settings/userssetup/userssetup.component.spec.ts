import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserssetupComponent } from './userssetup.component';

describe('UserssetupComponent', () => {
  let component: UserssetupComponent;
  let fixture: ComponentFixture<UserssetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserssetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserssetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
