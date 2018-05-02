import { NgModule } from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {QrcodeComponent} from './based/qrcode/qrcode.component';
import {DepartmentButtonComponent} from './based/department-button/department-button.component';
import {OrderpageComponent} from './based/orderpage/orderpage.component';
import {ToastComponentComponent} from './based/toast-component/toast-component.component';
import {CanrouteService} from './remind/canroute.service';
import {MobieOrderComponent} from './based/mobie-order/mobie-order.component';
const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
  {path: 'home', loadChildren: 'app/home/home.module#HomeModule', canActivate: [CanrouteService]},
  {path: 'qrcode/:oid/:aluminumlength/:targetlist/:aluminumcode', component: QrcodeComponent, canActivate: [CanrouteService]},
  {path: 'department', component: DepartmentButtonComponent},
  {path: 'orderpage', component: OrderpageComponent, canActivate: [CanrouteService]},
  {path: 'toast', component: ToastComponentComponent, canActivate: [CanrouteService]},
  {path: 'mobie/:targetlist/:aluminumcode', component: MobieOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRouterModule {}
