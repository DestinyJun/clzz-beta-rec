import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticsOrderComponent } from './tactics-order.component';

describe('TacticsOrderComponent', () => {
  let component: TacticsOrderComponent;
  let fixture: ComponentFixture<TacticsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
