import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {ProductRoutersModule} from './product.routers.module';
import {ProductOutComponent} from './product-out/product-out.component';
import {ProductEntryComponent} from './product-entry/product-entry.component';
import {ProductEntringComponent} from './product-entring/product-entring.component';
@NgModule({
  imports: [
    CommonModule,
    ProductRoutersModule
  ],
  declarations: [
    ProductComponent,
    ProductEntryComponent,
    ProductOutComponent,
    ProductEntringComponent
  ],
  providers: [],
})
export class ProductModule { }
