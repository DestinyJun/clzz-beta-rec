import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {TemperatureComponent} from './temperature/temperature.component';

@Injectable()
export class TemperatureIntervalService implements CanDeactivate<TemperatureComponent> {
  canDeactivate(
    component: TemperatureComponent
  ) {
    console.log(11);
    clearInterval(component.interval);
    return true;
  }
}
