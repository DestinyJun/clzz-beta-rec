import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginIdService} from '../../login/login-id.service';
import {Url} from '../../getUrl';

@Injectable()
export class ScheduleHttpService {

  seeOrders = new SeeOrders(this.user.getObject('user').sysids);
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

  public OrderMobileFunction(move: object): Observable<any> {
    const body = this.parameterSerialization(move);
    console.log(body);
    return this.http.post('http://' + this.url + '/element-plc/order/mobile-function', body, {
      headers: this.headers
    });
  }

  public OrderAudited(): Observable<any> {
    const body = this.parameterSerialization({
      sysids: this.user.getObject('user').sysids
    });
    return this.http.post('http://' + this.url + '/element-plc/order/audited', body, {
      headers: this.headers
    });
  }

  public SeeOrders(page, row, status): Observable<any> {
    this.seeOrders.set(page, row, status);
    const body = this.parameterSerialization(this.seeOrders);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/See-Orders', body, {
      headers: this.headers
    });
  }

  public DelOrders(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/Del-Orders', body, {
      headers: this.headers
    });
  }

  public UpdateOrders(obj: object): Observable<any> {
    obj['auditor'] = this.user.getObject('user').realName;
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/Update-Orders', body, {
      headers: this.headers
    });
  }

  public AddOrders(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/Add-Orders', body, {
      headers: this.headers
    });
  }

  public FindOrdersId(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/FindOrdersId', body, {
      headers: this.headers
    });
  }
}
class SeeOrders {
  page: string;
  row: string;
  status: string;
  sysids: string;
  constructor(sysids) {
    this.sysids = sysids;
  }
  set(page, row, status) {
    this.page = page;
    this.row = row;
    this.status = status;
  }
}
class UpdateOrders {
  status: string;
  oid: string;
}
