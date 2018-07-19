import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {LoginIdService} from '../login/login-id.service';
@Injectable()
export class CanrouteService implements CanActivate {

  constructor() {}
  canActivate() {
    return LoginIdService.loginStatus;
  }
}
