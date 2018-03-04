import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
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
export class ProductRoutersModule {}
