import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobieOrderComponent } from './mobie-order.component';

describe('MobieOrderComponent', () => {
  let component: MobieOrderComponent;
  let fixture: ComponentFixture<MobieOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobieOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobieOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
