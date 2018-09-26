import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Url} from '../../getUrl';

@Injectable()
export class EquipmentHttpService {

  url = new Url().getUrl();
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
    return this.http.post('http://' + this.url + '/element/find/device/information', body, {
      headers: this.headers
    });
  }

  public SeeModularDeviceSensor(Mid: object): Observable<any> {
    const body = this.parameterSerialization(Mid);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/SeeModular-Device-Sensor', body, {
      headers: this.headers
    });
  }

  public seesensordata(sid: object): Observable<any> {
    const body = this.parameterSerialization(sid);
    return this.http.post('http://' + this.url + '/element/seesensordata', body, {
      headers: this.headers
    });
  }
  public findhstorysensordata(sid: object): Observable<any> {
    const body = this.parameterSerialization(sid);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/find-hstory-sensordata', body, {
      headers: this.headers
    });
  }
  public SeeDeviceSensor(did: object): Observable<any> {
    const body = this.parameterSerialization(did);
    return this.http.post('http://' + this.url + '/element/SeeDeviceSensor', body, {
      headers: this.headers
    });
  }

  public SeeSystemModular(obj: object): Observable<any> {
    const body = this.parameterSerialization(obj);
    return this.http.post('http://' + this.url + '/element-plc/find-system-modular', body, {
      headers: this.headers
    });
  }



}
