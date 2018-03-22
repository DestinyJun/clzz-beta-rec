import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {HttpModule } from '@angular/http';
import {AppRouterModule} from './app.router.module';
import {AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RemindComponent } from './based/remind/remind.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginIdService} from './remind/login-id.service';
import {ModalModule} from 'ngx-bootstrap';
import { DepartmentButtonComponent } from './based/department-button/department-button.component';
@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    RemindComponent,
    DepartmentButtonComponent
  ],
  providers: [LoginIdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
