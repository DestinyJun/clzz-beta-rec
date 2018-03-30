import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAdjustmentComponent } from './order-adjustment.component';

describe('OrderAdjustmentComponent', () => {
  let component: OrderAdjustmentComponent;
  let fixture: ComponentFixture<OrderAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
