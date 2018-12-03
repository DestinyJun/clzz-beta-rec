import { Injectable } from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {SensorComponent} from './sensor/sensor.component';
import {TemperatureComponent} from './temperature/temperature.component';

@Injectable()
export class TemperatureIntervalService implements CanDeactivate<TemperatureComponent> {
  canDeactivate(
    component: TemperatureComponent
  ) {

    clearInterval(component.interval);
    return true;
  }
}
