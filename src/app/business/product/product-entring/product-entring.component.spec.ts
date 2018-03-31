import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEntringComponent } from './product-entring.component';

describe('ProductEntringComponent', () => {
  let component: ProductEntringComponent;
  let fixture: ComponentFixture<ProductEntringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEntringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEntringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
