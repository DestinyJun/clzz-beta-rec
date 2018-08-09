import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauditedMaterialComponent } from './unaudited-material.component';

describe('UnauditedMaterialComponent', () => {
  let component: UnauditedMaterialComponent;
  let fixture: ComponentFixture<UnauditedMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauditedMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauditedMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
