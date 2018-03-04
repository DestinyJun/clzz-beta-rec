import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaterialComponent} from './material.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: MaterialComponent,
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
export class MaterialRoutersModule {}
