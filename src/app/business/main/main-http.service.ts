import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Url} from '../../getUrl';

@Injectable()
export class MainHttpService {

  url = new Url().getUrl();
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient) { }

  parameterSerialization(obj: object): string {
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

  public SeeOrders(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/See-Orders', body, {
      headers: this.headers
    });
  }
}
