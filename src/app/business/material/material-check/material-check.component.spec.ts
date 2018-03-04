import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCheckComponent } from './material-check.component';

describe('MaterialCheckComponent', () => {
  let component: MaterialCheckComponent;
  let fixture: ComponentFixture<MaterialCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
