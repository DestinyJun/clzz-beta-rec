import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialComponent} from './material.component';
import {MaterialRoutersModule} from './material.routers.module';
import {MaterialEntryComponent} from './material-entry/material-entry.component';
import {MaterialCheckComponent} from './material-check/material-check.component';
import {MaterialMessageComponent} from './material-message/material-message.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialRoutersModule
  ],
  declarations: [
    MaterialComponent,
    MaterialEntryComponent,
    MaterialCheckComponent,
    MaterialMessageComponent
  ],
  providers: [],
})
export class MaterialModule { }
