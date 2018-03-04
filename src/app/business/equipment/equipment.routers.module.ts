import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EquipmentComponent} from './equipment.component';
import {DeviceChangeComponent} from './device-change/device-change.component';
import {DeviceHistoryComponent} from './device-history/device-history.component';
import {DeviceNewComponent} from './device-new/device-new.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    children: [
      {path: 'devhis', component: DeviceHistoryComponent},
      {path: 'devnew', component: DeviceNewComponent},
      {path: 'devche', component: DeviceChangeComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class EquipmentRoutersModule {}
