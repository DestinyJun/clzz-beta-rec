import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductComponent} from './product.component';
import {ProductRoutersModule} from './product.routers.module';
import {ProductOutComponent} from './product-out/product-out.component';
import {ProductEntryComponent} from './product-entry/product-entry.component';
@NgModule({
  imports: [
    CommonModule,
    ProductRoutersModule
  ],
  declarations: [
    ProductComponent,
    ProductEntryComponent,
    ProductOutComponent,

  ],
  providers: [],
})
export class ProductModule { }
