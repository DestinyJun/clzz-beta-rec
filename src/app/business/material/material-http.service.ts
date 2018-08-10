import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Url} from '../../getUrl';

@Injectable()
export class MaterialHttpService {

  url = new Url().getUrl();
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'});
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

  public findrawpage(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/findrawpage', body, {
      headers: this.headers
    });
  }

  public SeeAluminum(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/SeeAluminum', body, {
      headers: this.headers
    });
  }

  public SeePaint(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/See-Paint', body, {
      headers: this.headers
    });
  }

  public updateal(obj: object): Observable<any> {
    const body = obj;
    console.log(body);
    return this.http.post('http://' + this.url + '/element/update-al', body);
  }

  public allauditpa(obj: object): Observable<any> {
    const body = obj;
    console.log(body);
    return this.http.post('http://' + this.url + '/element/allauditpa', body);
  }

}
