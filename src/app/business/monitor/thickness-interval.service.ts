import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {ThicknessComponent} from './thickness/thickness.component';

@Injectable()
export class ThicknessIntervalService implements CanDeactivate<ThicknessComponent> {
  canDeactivate(
    component: ThicknessComponent
  ) {
    console.log(11);
    clearInterval(component.interval);
    return true;
  }
}
