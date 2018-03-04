import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', loadChildren: 'app/business/main/main.module#MainModule'},
      {path: 'monitor', loadChildren: 'app/business/monitor/monitor.module#MonitorModule'},
      {path: 'equipment', loadChildren: 'app/business/equipment/equipment.module#EquipmentModule'},
      {path: 'schedule', loadChildren: 'app/business/schedule/schedule.module#ScheduleModule'},
      {path: 'material', loadChildren: 'app/business/material/material.module#MaterialModule'},
      {path: 'product', loadChildren: 'app/business/product/product.module#ProductModule'},
      {path: 'tactics', loadChildren: 'app/business/tactics/tactics.module#TacticsModule'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutersModule {}
