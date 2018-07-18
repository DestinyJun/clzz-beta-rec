import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponent} from './material.component';
import {MaterialRoutersModule} from './material.routers.module';
import {MaterialEntryComponent} from './material-entry/material-entry.component';
import {MaterialCheckComponent} from './material-check/material-check.component';
import {MaterialMessageComponent} from './material-message/material-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InfoStatusService} from '../../remind/info-status.service';
import {MaterialHttpService} from './material-http.service';
import {NgxQRCodeModule} from 'ngx-qrcode2';
@NgModule({
  imports: [
    CommonModule,
    MaterialRoutersModule,
    ReactiveFormsModule,
    FormsModule,
    NgxQRCodeModule,
  ],
  declarations: [
    MaterialComponent,
    MaterialEntryComponent,
    MaterialCheckComponent,
    MaterialMessageComponent,
  ],
  providers: [InfoStatusService, MaterialHttpService],
})
export class MaterialModule { }
