import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MonitorHttpService {

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

  public SeeSystemModular(sysid: object): Observable<any> {
    const body = this.parameterSerialization(sysid);
    return this.http.post('http://120.78.137.182/element-plc/find-system-modular', body, {
      headers: this.headers
    });
  }

  public FindDevicenameSensornameSensordata(mid: object): Observable<any> {
    const body = this.parameterSerialization(mid);
    return this.http.post('http://120.78.137.182/element/find/devicename/sensorname/sensordata', body, {
      headers: this.headers
    });
  }

  public modularDeviceSensorName(mid: object): Observable<any> {
    const body = this.parameterSerialization(mid);
    return this.http.post('http://120.78.137.182/element/find/modular/device/sensor/name', body, {
      headers: this.headers
    });
  }

  public findhstorysensordata(sid: object): Observable<any> {
    const body = this.parameterSerialization(sid);
    console.log(body);
    return this.http.post('http://120.78.137.182/element/find-hstory-sensordata', body, {
      headers: this.headers
    });
  }

  public FindTemperatureSensor(): Observable<any> {
    const body = this.parameterSerialization({timeStamp: Date()});
    return this.http.post('http://120.78.137.182/element/find/temperature/sensor', body, {
      headers: this.headers
    });
  }
}