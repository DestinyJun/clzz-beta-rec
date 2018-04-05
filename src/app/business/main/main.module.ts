import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRoutersModule} from './main.routers.module';
import {HttpService} from '../../shared/http.service';
import {EventComponent} from './event/event.component';
import {ProductionComponent} from './production/production.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {ListComponent} from './list/list.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MainRoutersModule,
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
  providers: [HttpService],
})
export class MainModule { }
