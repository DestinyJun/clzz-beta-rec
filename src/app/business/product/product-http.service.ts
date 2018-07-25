import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginIdService} from '../../login/login-id.service';

@Injectable()
export class ProductHttpService {

  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private user: LoginIdService) { }

  private parameterSerialization(obj: object): string {
    let result: string;
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!result) {
          result = prop + '=' + obj[prop];
        } else {
          result += '&' + prop + '=' + obj[prop];
        }
      }
    }
    return result;
  }

  public findproduceinformation(): Observable<any> {
    const body = this.parameterSerialization({
      sysids: this.user.getObject('user').sysids
    });
    return this.http.post('http://120.78.137.182/element-plc/find-produce-information', body, {
      headers: this.headers
    });
  }

  public findfinishedwarehouse(): Observable<any> {
    const body = this.parameterSerialization({
      sysids: this.user.getObject('user').sysids
    });
    return this.http.post('http://120.78.137.182/element-plc/find-finished-warehouse', body, {
      headers: this.headers
    });
  }

  public findwarehouseout(): Observable<any> {
    const body = this.parameterSerialization({
      sysids: this.user.getObject('user').sysids
    });
    return this.http.post('http://120.78.137.182/element-plc/find-warehouse-out', body, {
      headers: this.headers
    });
  }

  public findamendorder(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://120.78.137.182/element-plc/find-amend-order', body, {
      headers: this.headers
    });
  }

  public amendorder(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://120.78.137.182/element-plc/amend-order', body, {
      headers: this.headers
    });
  }

}
