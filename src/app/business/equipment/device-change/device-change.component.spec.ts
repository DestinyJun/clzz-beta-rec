import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceChangeComponent } from './device-change.component';

describe('DeviceChangeComponent', () => {
  let component: DeviceChangeComponent;
  let fixture: ComponentFixture<DeviceChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
