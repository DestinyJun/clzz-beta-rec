import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaterialComponent} from './material.component';
import {MaterialEntryComponent} from './material-entry/material-entry.component';
import {MaterialCheckComponent} from './material-check/material-check.component';
import {MaterialMessageComponent} from './material-message/material-message.component';
import {CheckedMaterialComponent} from './checked-material/checked-material.component';
import {UnauditedMaterialComponent} from './unaudited-material/unaudited-material.component';
import {FailedMaterialComponent} from './failed-material/failed-material.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    children: [
      {path: 'matent', component: MaterialEntryComponent},
      {path: 'matche/:page', component: MaterialCheckComponent},
      {path: 'matmes/:page', component: MaterialMessageComponent},
      {path: 'checked/:page', component: CheckedMaterialComponent},
      {path: 'unaudited/:page', component: UnauditedMaterialComponent},
      {path: 'failed/:page', component: FailedMaterialComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class MaterialRoutersModule {}
