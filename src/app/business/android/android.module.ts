import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AndroidComponent } from './android.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxQRCodeModule} from 'ngx-qrcode2';
const routes: Routes = [
  {path: '', redirectTo: 'android', pathMatch: 'full'},
  {path: 'android', component: AndroidComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule,
  ],
  declarations: [AndroidComponent]
})
export class AndroidModule { }
