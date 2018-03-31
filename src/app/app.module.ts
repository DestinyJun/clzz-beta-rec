import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {HttpModule } from '@angular/http';
import {AppRouterModule} from './app.router.module';
import {AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RemindComponent } from './based/remind/remind.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginIdService} from './remind/login-id.service';
import {BsModalRef, BsModalService, ModalModule} from 'ngx-bootstrap';
import { DepartmentButtonComponent } from './based/department-button/department-button.component';
import { QrcodeComponent } from './based/qrcode/qrcode.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import { OrderpageComponent } from './based/orderpage/orderpage.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxQRCodeModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    RemindComponent,
    DepartmentButtonComponent,
    QrcodeComponent,
    OrderpageComponent,
  ],
  providers: [LoginIdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
