import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from './schedule.component';
import {OrderQueryComponent} from './order-query/order-query.component';
import {OrderMarketingComponent} from './order-marketing/order-marketing.component';
import {OrderCraftComponent} from './order-craft/order-craft.component';
import {OrderAdjustmentComponent} from './order-adjustment/order-adjustment.component';
import {ScheduleHttpService} from './schedule-http.service';
const mainRoutes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {path: 'ordque/:page', component: OrderQueryComponent},
      {path: 'ordmar/:page', component: OrderMarketingComponent},
      {path: 'ordcra/:page', component: OrderCraftComponent},
      {path: 'ordadj/:page', component: OrderAdjustmentComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: [ScheduleHttpService]
})
export class ScheduleRoutersModule {}
