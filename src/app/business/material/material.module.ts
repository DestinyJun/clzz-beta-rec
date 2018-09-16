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
import {CheckedMaterialComponent} from './checked-material/checked-material.component';
import {FailedMaterialComponent} from './failed-material/failed-material.component';
import {UnauditedMaterialComponent} from './unaudited-material/unaudited-material.component';
import {MaterialTableComponent} from './material-table/material-table.component';
import {PageBetaService} from '../../based/page-beta.service';
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
    CheckedMaterialComponent,
    FailedMaterialComponent,
    UnauditedMaterialComponent,
    MaterialTableComponent
  ],
  providers: [InfoStatusService, MaterialHttpService, PageBetaService],
})
export class MaterialModule { }
