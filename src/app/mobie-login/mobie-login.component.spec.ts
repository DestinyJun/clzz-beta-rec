import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobieLoginComponent } from './mobie-login.component';

describe('MobieLoginComponent', () => {
  let component: MobieLoginComponent;
  let fixture: ComponentFixture<MobieLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobieLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobieLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
