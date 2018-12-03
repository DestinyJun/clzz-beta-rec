import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginIdService} from '../../login/login-id.service';
import {Url} from '../../getUrl';

@Injectable()
export class ScheduleHttpService {

  seeOrders = new SeeOrders();
  searchOrders = new SearchOrders();
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

  public normsPurpose(): Observable<any> {
    return this.http.post('http://' + this.url + '/element/nomrsPurpose', ' ', {
      headers: this.headers
    });
  }
  public normsType(): Observable<any> {
    return this.http.post('http://' + this.url + '/element/normsType', ' ', {
      headers: this.headers
    });
  }
  public alloyState(): Observable<any> {
    return this.http.post('http://' + this.url + '/element/alloyState', ' ', {
      headers: this.headers
    });
  }
  public OrderMobileFunction(move: object): Observable<any> {
    const body = this.parameterSerialization(move);
    console.log(body);
    return this.http.post('http://' + this.url + '/element-plc/order/mobile-function', body, {
      headers: this.headers
    });
  }

  public OrderAudited(sysIds): Observable<any> {
    const body = this.parameterSerialization({
      sysIds: sysIds
    });
    return this.http.post('http://' + this.url + '/element-plc/order/audited', body, {
      headers: this.headers
    });
  }

  SeeOrders(page, row, status, sysIds): Observable<any> {
    this.seeOrders.set(page, row, status, sysIds);
    const body = this.parameterSerialization(this.seeOrders);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/See-Orders', body, {
      headers: this.headers
    });
  }
  searchorders(page, row, status, sysIds): Observable<any> {
    this.searchOrders.set(page, row, status, sysIds);
    const body = this.parameterSerialization(this.searchOrders);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/search-orders', body, {
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
  findCountryProvinceCity() {
    return this.http.post('http://' + this.url + '/element/find-country-province-city', '', {
      headers: this.headers
    });
  }
}
class SeeOrders {
  page: string;
  row: string;
  status: string;
  sysids: string;
  set(page, row, status, sysIds) {
    this.page = page;
    this.row = row;
    this.status = status;
    this.sysids = sysIds;
  }
}
class UpdateOrders {
  status: string;
  oid: string;
}
class SearchOrders {
  page: string;
  row: string;
  search: string;
  sysids: string;
  set(page, row, search, sysIds) {
    this.page = page;
    this.row = row;
    this.search = search;
    this.sysids = sysIds;
  }
}
