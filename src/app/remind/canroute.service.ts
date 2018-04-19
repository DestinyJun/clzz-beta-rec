import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {LoginIdService} from './login-id.service';
@Injectable()
export class CanrouteService implements CanActivate {

  constructor(private session: LoginIdService) {}
  canActivate() {
    console.log(this.session.get('userId'));
    console.log(this.session);
    if (this.session.get('userId')) {
      return true;
    }
      return false;
  }
}
