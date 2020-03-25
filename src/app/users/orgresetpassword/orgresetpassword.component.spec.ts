import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgresetpasswordComponent } from './orgresetpassword.component';

describe('OrgresetpasswordComponent', () => {
  let component: OrgresetpasswordComponent;
  let fixture: ComponentFixture<OrgresetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgresetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
