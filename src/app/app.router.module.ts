import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {QrcodeComponent} from './based/qrcode/qrcode.component';
import {DepartmentButtonComponent} from './based/department-button/department-button.component';
import {OrderpageComponent} from './based/orderpage/orderpage.component';
const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
  {path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
  {path: 'qrcode/:id', component: QrcodeComponent},
  {path: 'department', component: DepartmentButtonComponent},
  {path: 'orderpage', component: OrderpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRouterModule {}
