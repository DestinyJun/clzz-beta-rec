import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {EquipmentRoutersModule} from './equipment.routers.module';
import {EquipmentComponent} from './equipment.component';
import {DeviceHistoryComponent} from './device-history/device-history.component';
import {DeviceNewComponent} from './device-new/device-new.component';
import {EquipmentHttpService} from './equipment-http.service';
import {CommonMmoduleModule} from '../../commonModule/common-mmodule.module';
import {InspectionComponent} from './inspection/inspection.component';
@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    EquipmentRoutersModule,
    CommonMmoduleModule
  ],
  declarations: [
    EquipmentComponent,
    DeviceHistoryComponent,
    DeviceNewComponent,
    InspectionComponent
  ],
  providers: [EquipmentHttpService],
})
export class EquipmentModule { }
