import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {LoginIdService} from '../login/login-id.service';
@Injectable()
export class CanrouteService implements CanActivate {

  constructor(private loginIdService: LoginIdService) {}
  canActivate() {
    console.log(this.loginIdService.getBool('loginStatus'));
    // return this.loginIdService.getBool('loginStatus');

    return true;
  }
}
