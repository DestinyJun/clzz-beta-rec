import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedMaterialComponent } from './failed-material.component';

describe('FailedMaterialComponent', () => {
  let component: FailedMaterialComponent;
  let fixture: ComponentFixture<FailedMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
