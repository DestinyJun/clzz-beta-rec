import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MaterialHttpService {

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
    return this.http.post('http://120.78.137.182/element/findrawpage', body, {
      headers: this.headers
    });
  }

  public SeeAluminum(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://120.78.137.182/element/SeeAluminum', body, {
      headers: this.headers
    });
  }

  public SeePaint(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    console.log(body);
    return this.http.post('http://120.78.137.182/element/See-Paint', body, {
      headers: this.headers
    });
  }

}
