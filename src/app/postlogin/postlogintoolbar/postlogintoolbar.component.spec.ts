import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlogintoolbarComponent } from './postlogintoolbar.component';

describe('PostlogintoolbarComponent', () => {
  let component: PostlogintoolbarComponent;
  let fixture: ComponentFixture<PostlogintoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostlogintoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostlogintoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
