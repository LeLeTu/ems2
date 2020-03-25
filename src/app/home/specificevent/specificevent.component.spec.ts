import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificeventComponent } from './specificevent.component';

describe('SpecificeventComponent', () => {
  let component: SpecificeventComponent;
  let fixture: ComponentFixture<SpecificeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
