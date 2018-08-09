import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EquipmentComponent} from './equipment.component';
import {DeviceHistoryComponent} from './device-history/device-history.component';
import {DeviceNewComponent} from './device-new/device-new.component';
import {InspectionComponent} from './inspection/inspection.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    children: [
      {path: 'devhis', component: DeviceHistoryComponent},
      {path: 'devnew', component: DeviceNewComponent},
      {path: 'inspection/:page', component: InspectionComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class EquipmentRoutersModule {}
