import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScheduleComponent} from './schedule.component';
import {OrderEntryComponent} from './order-entry/order-entry.component';
import {OrderQueryComponent} from './order-query/order-query.component';
import {OrderMarketingComponent} from './order-marketing/order-marketing.component';
import {OrderCraftComponent} from './order-craft/order-craft.component';
import {OrderAdjustmentComponent} from './order-adjustment/order-adjustment.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {path: 'ordque', component: OrderQueryComponent},
      {path: 'ordmar', component: OrderMarketingComponent},
      {path: 'ordcra', component: OrderCraftComponent},
      {path: 'ordadj', component: OrderAdjustmentComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class ScheduleRoutersModule {}
