import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProRunComponent } from './pro-run.component';

describe('ProRunComponent', () => {
  let component: ProRunComponent;
  let fixture: ComponentFixture<ProRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
