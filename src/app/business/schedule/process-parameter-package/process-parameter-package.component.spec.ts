import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessParameterPackageComponent } from './process-parameter-package.component';

describe('ProcessParameterPackageComponent', () => {
  let component: ProcessParameterPackageComponent;
  let fixture: ComponentFixture<ProcessParameterPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessParameterPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessParameterPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
