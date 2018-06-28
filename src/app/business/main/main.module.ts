import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {HttpService} from '../../shared/http.service';
import {EventComponent} from './event/event.component';
import {ProductionComponent} from './production/production.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {ListComponent} from './list/list.component';
import {BsDropdownModule, ModalModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainHttpService} from '../../remind/business/main-http.service';


@NgModule({
  imports: [
    CommonModule,
    NgxEchartsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    MainComponent,
    EventComponent,
    ProductionComponent,
    ListComponent
  ],
  providers: [HttpService, MainHttpService],
  exports: [MainComponent]
})
export class MainModule { }
