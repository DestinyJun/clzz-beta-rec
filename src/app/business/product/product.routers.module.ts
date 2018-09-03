import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product.component';
import {ProductEntryComponent} from './product-entry/product-entry.component';
import {ProductOutComponent} from './product-out/product-out.component';
import {ProductEntringComponent} from './product-entring/product-entring.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {path: 'procent/:page', component: ProductEntryComponent},
      {path: 'procout/:page', component: ProductOutComponent},
      {path: 'proenting/:page', component: ProductEntringComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutersModule {}
