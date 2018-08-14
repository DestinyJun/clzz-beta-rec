import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {TacticsRoutersModule} from './tactics.routers.module';
import {TacticsComponent} from './tactics.component';
import {TacticsMapComponent} from './tactics-map/tactics-map.component';
import {TacticsOrderComponent} from './tactics-order/tactics-order.component';
import {TacticsMarketingComponent} from './tactics-marketing/tactics-marketing.component';
import {TacticsOrderService} from './tactics-order/tactics-order.service';

@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    TacticsRoutersModule
  ],
  declarations: [
    TacticsComponent,
    TacticsMapComponent,
    TacticsOrderComponent,
    TacticsMarketingComponent
  ],
  providers: [TacticsOrderService],
})
export class TacticsModule { }
