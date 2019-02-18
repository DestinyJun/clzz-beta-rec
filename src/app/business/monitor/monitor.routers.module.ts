import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonitorComponent} from './monitor.component';
import {SensorComponent} from './sensor/sensor.component';
import {VideoComponent} from './video/video.component';
import {EventMonComponent} from './event-mon/event-mon.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {ThicknessComponent} from './thickness/thickness.component';
import {CanDeactivateGuardService} from './can-deactivate-guard.service';
import {TemperatureIntervalService} from './temperature-interval.service';
import {ThicknessIntervalService} from './thickness-interval.service';
const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {path: 'sensor', component: SensorComponent, canDeactivate: [CanDeactivateGuardService]},
      {path: 'video', component: VideoComponent},
      {path: 'event/:Page', component: EventMonComponent},
      {path: 'temperature', component: TemperatureComponent, canDeactivate: [TemperatureIntervalService]},
      {path: 'thickness', component: ThicknessComponent, canDeactivate: [ThicknessIntervalService]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MonitorRoutersModule {}
