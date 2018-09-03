import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginIdService} from '../../login/login-id.service';
import {Url} from '../../getUrl';

@Injectable()
export class ProductHttpService {

  url = new Url().getUrl();
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

  public findproduceinformation(page, row): Observable<any> {
    const body = this.parameterSerialization({
      page: page,
      row: row,
      sysids: this.user.getObject('user').sysids
    });
    return this.http.post('http://' + this.url + '/element-plc/find-produce-information-paging', body, {
      headers: this.headers
    });
  }

  findfinishedwarehouse(page, row): Observable<any> {
    const body = this.parameterSerialization({
      page: page,
      row: row,
      sysids: this.user.getObject('user').sysids
    });
    return this.http.post('http://'  + this.url + '/element-plc/find-finished-warehouse-paging', body, {
      headers: this.headers
    });
  }

  findwarehouseout(page, row): Observable<any> {
    const body = this.parameterSerialization({
      page: page,
      row: row,
      sysids: this.user.getObject('user').sysids
    });
    return this.http.post('http://' + this.url + '/element-plc/find-warehouse-out-paging', body, {
      headers: this.headers
    });
  }

  public findamendorder(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element-plc/find-amend-order', body, {
      headers: this.headers
    });
  }

  public amendorder(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element-plc/amend-order', body, {
      headers: this.headers
    });
  }

}
