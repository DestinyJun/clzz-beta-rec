import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMarketingComponent } from './order-marketing.component';

describe('OrderMarketingComponent', () => {
  let component: OrderMarketingComponent;
  let fixture: ComponentFixture<OrderMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
