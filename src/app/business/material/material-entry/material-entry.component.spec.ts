import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEntryComponent } from './material-entry.component';

describe('MaterialEntryComponent', () => {
  let component: MaterialEntryComponent;
  let fixture: ComponentFixture<MaterialEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
