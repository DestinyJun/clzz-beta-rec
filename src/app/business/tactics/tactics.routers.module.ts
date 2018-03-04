import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TacticsComponent} from './tactics.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: TacticsComponent,
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
export class TacticsRoutersModule {}
