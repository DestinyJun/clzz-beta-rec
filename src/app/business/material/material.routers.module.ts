import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaterialComponent} from './material.component';
import {MaterialEntryComponent} from './material-entry/material-entry.component';
import {MaterialCheckComponent} from './material-check/material-check.component';
import {MaterialMessageComponent} from './material-message/material-message.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: MaterialComponent,
    children: [
      {path: 'matent', component: MaterialEntryComponent},
      {path: 'matche/:status/:mode/:ALpage/:paintpage', component: MaterialCheckComponent},
      {path: 'matmes/:mode/:ALpage/:paintpage/:selectId', component: MaterialMessageComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: []
})
export class MaterialRoutersModule {}
