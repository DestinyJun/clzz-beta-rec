import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMonComponent } from './event-mon.component';

describe('EventComponent', () => {
  let component: EventMonComponent;
  let fixture: ComponentFixture<EventMonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
