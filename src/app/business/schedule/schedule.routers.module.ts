import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from './schedule.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      // {path: 'sensor', component: SensorComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class ScheduleRoutersModule {}
