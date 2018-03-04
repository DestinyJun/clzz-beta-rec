import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductEntryComponent} from './product-entry/product-entry.component';
import {ProductOutComponent} from './product-out/product-out.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {path: 'procent', component: ProductEntryComponent},
      {path: 'procout', component: ProductOutComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutersModule {}
