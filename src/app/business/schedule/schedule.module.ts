import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleComponent} from './schedule.component';
import {ScheduleRoutersModule} from './schedule.routers.module';
import {OrderQueryComponent} from './order-query/order-query.component';
import {OrderMarketingComponent} from './order-marketing/order-marketing.component';
import {OrderCraftComponent} from './order-craft/order-craft.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrderAdjustmentComponent } from './order-adjustment/order-adjustment.component';
import {ScheduleTableComponent} from './schedule-table/schedule-table.component';
import {PageBetaService} from '../../based/page-beta.service';
import {ProcessParameterPackageComponent} from './process-parameter-package/process-parameter-package.component';
@NgModule({
  imports: [
    CommonModule,
    ScheduleRoutersModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ScheduleComponent,
    OrderQueryComponent,
    OrderMarketingComponent,
    OrderCraftComponent,
    OrderAdjustmentComponent,
    ScheduleTableComponent,
    ProcessParameterPackageComponent,
  ],
  providers: [PageBetaService],
})
export class ScheduleModule { }
