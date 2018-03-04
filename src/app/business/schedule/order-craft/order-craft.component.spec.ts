import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCraftComponent } from './order-craft.component';

describe('OrderCraftComponent', () => {
  let component: OrderCraftComponent;
  let fixture: ComponentFixture<OrderCraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
