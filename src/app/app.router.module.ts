import { NgModule } from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {QrcodeComponent} from './based/qrcode/qrcode.component';
import {OrderpageComponent} from './based/orderpage/orderpage.component';
import {CanrouteService} from './remind/canroute.service';
import {MobieOrderComponent} from './based/mobie-order/mobie-order.component';
import {LoginComponent} from './login/login.component';
import {MobieLoginComponent} from './mobie-login/mobie-login.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'mobielogin/:username/:password/:web', component: MobieLoginComponent},
  {path: 'home', loadChildren: 'app/home/home.module#HomeModule', canActivate: [CanrouteService]},
  {path: 'qrcode/:purchase/:mode/:oid/:aluminumlength/:targetlist/:aluminumcode/:address',
    component: QrcodeComponent, canActivate: [CanrouteService]},
  {path: 'orderpage', component: OrderpageComponent, canActivate: [CanrouteService]},
  {path: 'mobie/:targetlist/:aluminumcode/:address/:oid', component: MobieOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRouterModule {}
