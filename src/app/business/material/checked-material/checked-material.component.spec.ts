import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedMaterialComponent } from './checked-material.component';

describe('CheckedMaterialComponent', () => {
  let component: CheckedMaterialComponent;
  let fixture: ComponentFixture<CheckedMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckedMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
