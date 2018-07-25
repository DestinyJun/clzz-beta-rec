import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import {SensorComponent} from './sensor/sensor.component';

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<SensorComponent> {

  canDeactivate(
    component: SensorComponent
  ) {

    clearInterval(component.interval);
    clearInterval(component.modal3);
    return true;
  }
}
