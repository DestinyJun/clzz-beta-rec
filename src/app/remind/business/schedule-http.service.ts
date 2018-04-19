import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ScheduleHttpService {

  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient) { }

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
    return this.http.post('http://120.78.137.182/element-plc/order/mobile-function', body, {
      headers: this.headers
    });
  }

  public OrderAudited(): Observable<any> {
    return this.http.post('http://120.78.137.182/element-plc/order/audited', '', {
      headers: this.headers
    });
  }


}
