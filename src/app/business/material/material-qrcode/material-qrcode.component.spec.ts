import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialQrcodeComponent } from './material-qrcode.component';

describe('MaterialQrcodeComponent', () => {
  let component: MaterialQrcodeComponent;
  let fixture: ComponentFixture<MaterialQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
