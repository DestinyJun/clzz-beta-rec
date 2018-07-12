import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndroidComponent } from './android.component';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {path: '', redirectTo: 'android', pathMatch: 'full'},
  {path: 'android', component: AndroidComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AndroidComponent]
})
export class AndroidModule { }
