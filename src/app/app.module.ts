import {BrowserModule } from '@angular/platform-browser';
import {NgModule } from '@angular/core';
import {HttpModule } from '@angular/http';
import {AppRouterModule} from './app.router.module';
import {AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { RemindComponent } from './based/remind/remind.component';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    RemindComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
