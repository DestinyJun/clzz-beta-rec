import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Url} from '../../../getUrl';

@Injectable()
export class TacticsOrderService {

  url = new Url().getUrl();
  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  findTotalProduct(sysIds) {
    const body = 'sysIds=' + sysIds;
    return this.http.post('http://' + this.url + '/element-plc/find-total-product', body, {
      headers: this.headers
    });
  }
}
