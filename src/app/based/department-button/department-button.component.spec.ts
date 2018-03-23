import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentButtonComponent } from './department-button.component';

describe('DepartmentButtonComponent', () => {
  let component: DepartmentButtonComponent;
  let fixture: ComponentFixture<DepartmentButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
