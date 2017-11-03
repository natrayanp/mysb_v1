import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliosetupComponent } from './portfoliosetup.component';

describe('PortfoliosetupComponent', () => {
  let component: PortfoliosetupComponent;
  let fixture: ComponentFixture<PortfoliosetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfoliosetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfoliosetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
