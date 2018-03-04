import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonitorComponent} from './monitor.component';
import {SensorComponent} from './sensor/sensor.component';
import {VideoComponent} from './video/video.component';
import {EventMonComponent} from './event-mon/event-mon.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {ThicknessComponent} from './thickness/thickness.component';
import {ProRunComponent} from './pro-run/pro-run.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {path: 'sensor', component: SensorComponent},
      {path: 'video', component: VideoComponent},
      {path: 'event', component: EventMonComponent},
      {path: 'temperature', component: TemperatureComponent},
      {path: 'thickness', component: ThicknessComponent},
      {path: 'prorun', component: ProRunComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class MonitorRoutersModule {}
