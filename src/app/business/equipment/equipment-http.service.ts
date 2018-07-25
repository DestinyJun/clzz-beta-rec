import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EquipmentHttpService {

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
  public FindDeviceInformation(page: object): Observable<any> {
    const body = this.parameterSerialization(page);
    return this.http.post('http://120.78.137.182/element/find/device/information', body, {
      headers: this.headers
    });
  }

  public SeeModularDeviceSensor(Mid: object): Observable<any> {
    const body = this.parameterSerialization(Mid);
    console.log(body);
    return this.http.post('http://120.78.137.182/element/SeeModular-Device-Sensor', body, {
      headers: this.headers
    });
  }

  public seesensordata(sid: object): Observable<any> {
    const body = this.parameterSerialization(sid);
    return this.http.post('http://120.78.137.182/element/seesensordata', body, {
      headers: this.headers
    });
  }

  public SeeDeviceSensor(did: object): Observable<any> {
    const body = this.parameterSerialization(did);
    return this.http.post('http://120.78.137.182/element/SeeDeviceSensor', body, {
      headers: this.headers
    });
  }

  public SeeSystemModular(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    return this.http.post('http://120.78.137.182/element/SeeSystemModular', body, {
      headers: this.headers
    });
  }



}
