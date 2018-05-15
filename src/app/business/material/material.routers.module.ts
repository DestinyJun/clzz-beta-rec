import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaterialComponent} from './material.component';
import {MaterialEntryComponent} from './material-entry/material-entry.component';
import {MaterialCheckComponent} from './material-check/material-check.component';
import {MaterialMessageComponent} from './material-message/material-message.component';
import {MaterialQrcodeComponent} from './material-qrcode/material-qrcode.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    children: [
      {path: 'matent', component: MaterialEntryComponent},
      {path: 'matche', component: MaterialCheckComponent},
      {path: 'matmes', component: MaterialMessageComponent},
      {path: 'matqco', component: MaterialQrcodeComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class MaterialRoutersModule {}
