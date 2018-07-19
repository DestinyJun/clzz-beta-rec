import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {AppRouterModule} from './app.router.module';
import {AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RemindComponent } from './based/remind/remind.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginIdService} from './remind/login-id.service';
import { DepartmentButtonComponent } from './based/department-button/department-button.component';
import { QrcodeComponent } from './based/qrcode/qrcode.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { OrderpageComponent } from './based/orderpage/orderpage.component';
import {UtilsService} from './remind/utils.service';
import {CanrouteService} from './remind/canroute.service';
import {InfoStatusService} from './remind/info-status.service';
import { MobieOrderComponent } from './based/mobie-order/mobie-order.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from './login/login.module';
import { MobieLoginComponent } from './mobie-login/mobie-login.component';
import {ModalModule} from 'ngx-bootstrap';
import {PageService} from './based/page.service';
import {CommonMmoduleModule} from './commonModule/common-mmodule.module';



@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    LoginModule
  ],
  declarations: [
    AppComponent,
    RemindComponent,
    DepartmentButtonComponent,
    QrcodeComponent,
    OrderpageComponent,
    MobieOrderComponent,
    MobieLoginComponent,
  ],
  providers: [LoginIdService, UtilsService, CanrouteService, InfoStatusService, PageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
