import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentComponent} from './equipment.component';
import {DeviceChangeComponent} from './device-change/device-change.component';
import {DeviceHistoryComponent} from './device-history/device-history.component';
import {DeviceNewComponent} from './device-new/device-new.component';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    EquipmentComponent,
    DeviceChangeComponent,
    DeviceHistoryComponent,
    DeviceNewComponent
  ],
  providers: [],
})
export class EquipmentModule { }
