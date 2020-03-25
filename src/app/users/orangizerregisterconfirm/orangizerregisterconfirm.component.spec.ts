import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrangizerregisterconfirmComponent } from './orangizerregisterconfirm.component';

describe('OrangizerregisterconfirmComponent', () => {
  let component: OrangizerregisterconfirmComponent;
  let fixture: ComponentFixture<OrangizerregisterconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangizerregisterconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrangizerregisterconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
