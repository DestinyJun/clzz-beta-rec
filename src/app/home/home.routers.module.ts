import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PersonalInfoComponent} from './personal-info/personal-info.component';
import {HomeComponent} from './home.component';
import {MainComponent} from '../business/main/main.component';
const homeRoutes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: '', component: MainComponent},
      {path: 'monitor', loadChildren: 'app/business/monitor/monitor.module#MonitorModule'},
      {path: 'equipment', loadChildren: 'app/business/equipment/equipment.module#EquipmentModule'},
      {path: 'schedule', loadChildren: 'app/business/schedule/schedule.module#ScheduleModule'},
      {path: 'material', loadChildren: 'app/business/material/material.module#MaterialModule'},
      {path: 'product', loadChildren: 'app/business/product/product.module#ProductModule'},
      {path: 'tactics', loadChildren: 'app/business/tactics/tactics.module#TacticsModule'},
      {path: 'perInfo', component: PersonalInfoComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutersModule {}
