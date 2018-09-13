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
import {PageBetaService} from '../../based/page-beta.service';
import {CalendarModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    EquipmentRoutersModule,
    CommonMmoduleModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [
    EquipmentComponent,
    DeviceHistoryComponent,
    DeviceNewComponent,
    InspectionComponent
  ],
  providers: [EquipmentHttpService, PageBetaService],
})
export class EquipmentModule { }
