import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMessageComponent } from './material-message.component';

describe('MaterialMessageComponent', () => {
  let component: MaterialMessageComponent;
  let fixture: ComponentFixture<MaterialMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
