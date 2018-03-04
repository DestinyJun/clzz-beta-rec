import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacticsMarketingComponent } from './tactics-marketing.component';

describe('TacticsMarketingComponent', () => {
  let component: TacticsMarketingComponent;
  let fixture: ComponentFixture<TacticsMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticsMarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacticsMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
