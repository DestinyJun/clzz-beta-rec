import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticsMapComponent } from './tactics-map.component';

describe('TacticsMapComponent', () => {
  let component: TacticsMapComponent;
  let fixture: ComponentFixture<TacticsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
