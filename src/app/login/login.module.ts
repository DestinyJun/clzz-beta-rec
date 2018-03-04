import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginRoutersModule} from './login.routers.module';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutersModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [],
  bootstrap: []
})
export class LoginModule {}
