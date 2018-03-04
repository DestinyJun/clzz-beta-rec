import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {HttpService} from '../../shared/http.service';
import {MonitorRoutersModule} from './monitor.routers.module';
import {MonitorComponent} from './monitor.component';
import {SensorComponent} from './sensor/sensor.component';
import {VideoComponent} from './video/video.component';
import {EventMonComponent} from './event-mon/event-mon.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {ThicknessComponent} from './thickness/thickness.component';
import {ProRunComponent} from './pro-run/pro-run.component';


@NgModule({
  imports: [
    CommonModule,
    MonitorRoutersModule,
    NgxEchartsModule
  ],
  declarations: [
    MonitorComponent,
    SensorComponent,
    VideoComponent,
    EventMonComponent,
    TemperatureComponent,
    ThicknessComponent,
    ProRunComponent
  ],
  providers: [HttpService],
})
export class MonitorModule { }
