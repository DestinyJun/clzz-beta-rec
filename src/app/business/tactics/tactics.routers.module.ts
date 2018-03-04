import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TacticsComponent} from './tactics.component';
import {TacticsMapComponent} from './tactics-map/tactics-map.component';
import {TacticsOrderComponent} from './tactics-order/tactics-order.component';
import {TacticsMarketingComponent} from './tactics-marketing/tactics-marketing.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: TacticsComponent,
    children: [
      {path: 'tacmap', component: TacticsMapComponent},
      {path: 'tacord', component: TacticsOrderComponent},
      {path: 'tacmark', component: TacticsMarketingComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class TacticsRoutersModule {}
