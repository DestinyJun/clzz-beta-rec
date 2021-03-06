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

  findproduceinformation(page, row, sysIds): Observable<any> {
    const body = this.parameterSerialization({
      page: page,
      row: row,
      sysIds: sysIds
    });
    return this.http.post('http://' + this.url + '/element-plc/find-produce-information-paging', body, {
      headers: this.headers
    });
  }

  findFinishedWareHouse(page, row, sysIds): Observable<any> {
    const body = this.parameterSerialization({
      page: page,
      row: row,
      sysIds: sysIds
  });
    return this.http.post('http://'  + this.url + '/element-plc/find-finished-warehouse-paging', body, {
      headers: this.headers
    });
  }
  searchFinishedProduct(contractName): Observable<any> {
    const body = this.parameterSerialization({
      contractName: contractName,
      sysIds: this.user.getObject('user').sysids
    });
    console.log(body);
    return this.http.post('http://'  + this.url + '/element-plc/search-finished-product', body, {
      headers: this.headers
    });
  }
  searchWareHouseIn(contractName): Observable<any> {
    const body = this.parameterSerialization({
      contractName: contractName,
      sysIds: this.user.getObject('user').sysids
    });
    console.log(body);
    return this.http.post('http://'  + this.url + '/element-plc/search-warehouse-in', body, {
      headers: this.headers
    });
  }
  searchWareHouseOut(contractName): Observable<any> {
    const body = this.parameterSerialization({
      contractName: contractName,
      sysIds: this.user.getObject('user').sysids
    });
    console.log(body);
    return this.http.post('http://'  + this.url + '/element-plc/search-warehouse-out', body, {
      headers: this.headers
    });
  }

  findWareHouseOut(page, row, sysId): Observable<any> {
    const body = this.parameterSerialization({
      page: page,
      row: row,
      sysIds: sysId
    });
    return this.http.post('http://' + this.url + '/element-plc/find-warehouse-out-paging', body, {
      headers: this.headers
    });
  }

  findamendorder(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element-plc/find-amend-order', body, {
      headers: this.headers
    });
  }

  amendorder(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element-plc/amend-order', body, {
      headers: this.headers
    });
  }

}
