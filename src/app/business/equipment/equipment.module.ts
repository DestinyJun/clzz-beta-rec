import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {EquipmentRoutersModule} from './equipment.routers.module';
import {EquipmentComponent} from './equipment.component';
import {DeviceHistoryComponent} from './device-history/device-history.component';
import {DeviceNewComponent} from './device-new/device-new.component';
import {EquipmentHttpService} from '../../remind/business/equipment-http.service';
@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    EquipmentRoutersModule,
  ],
  declarations: [
    EquipmentComponent,
    DeviceHistoryComponent,
    DeviceNewComponent
  ],
  providers: [EquipmentHttpService],
})
export class EquipmentModule { }
