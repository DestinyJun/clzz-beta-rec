import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionBarComponent } from './position-bar.component';

describe('PositionBarComponent', () => {
  let component: PositionBarComponent;
  let fixture: ComponentFixture<PositionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
