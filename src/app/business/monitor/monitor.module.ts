import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {HttpService} from '../../based/http.service';
import {MonitorRoutersModule} from './monitor.routers.module';
import {MonitorComponent} from './monitor.component';
import {SensorComponent} from './sensor/sensor.component';
import {VideoComponent} from './video/video.component';
import {EventMonComponent} from './event-mon/event-mon.component';
import {TemperatureComponent} from './temperature/temperature.component';
import {ThicknessComponent} from './thickness/thickness.component';
import {MonitorHttpService} from './monitor-http.service';
import {CanDeactivateGuardService} from './can-deactivate-guard.service';
import {BursterComponent} from '../../commonModule/burster/burster.component';
import {TableComponent} from '../../commonModule/table/table.component';
import {CommonMmoduleModule} from '../../commonModule/common-mmodule.module';
import {SensorService} from './sensor/sensor.service';
import {PageBetaService} from '../../based/page-beta.service';


@NgModule({
  imports: [
    CommonModule,
    MonitorRoutersModule,
    NgxEchartsModule,
    CommonMmoduleModule
  ],
  declarations: [
    MonitorComponent,
    SensorComponent,
    VideoComponent,
    EventMonComponent,
    TemperatureComponent,
    ThicknessComponent
  ],
  providers: [HttpService, MonitorHttpService, PageBetaService,
    SensorService, CanDeactivateGuardService],
  exports: [SensorComponent]
})
export class MonitorModule { }
