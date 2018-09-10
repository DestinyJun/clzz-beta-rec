import { Injectable } from '@angular/core';
import {LoginIdService} from '../../../login/login-id.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Url} from '../../../getUrl';
@Injectable()
export class SensorService {

  url = new Url().getUrl();
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private user: LoginIdService) { }
  SeeSystemModular(sysid: object): Observable<any> {
    const body = this.parameterSerialization(sysid);
    return this.http.post('http://' + this.url + '/element/SeeSystemModular', body, {
      headers: this.headers
    });
  }
  public findSystemModular(sysid: object): Observable<any> {
    const body = this.parameterSerialization(sysid);
    return this.http.post('http://' + this.url + '/element-plc/find-system-modular', body, {
      headers: this.headers
    });
  }
  FindDevicenameSensornameSensordata(mid: object): Observable<any> {
    const body = this.parameterSerialization(mid);
    return this.http.post('http://' + this.url + '/element/find/devicename/sensorname/sensordata', body, {
      headers: this.headers
    });
  }

  modularDeviceSensorName(mid: object): Observable<any> {
    const body = this.parameterSerialization(mid);
    return this.http.post('http://' + this.url + '/element/find/modular/device/sensor/name', body, {
      headers: this.headers
    });
  }

  findHistorySensorData(sid: object): Observable<any> {
    const body = this.parameterSerialization(sid);
    console.log(body);
    return this.http.post('http://' + this.url + '/element/find-hstory-sensordata', body, {
      headers: this.headers
    });
  }
  findDeviceNameSensorName(mid: object): Observable<any> {
    const body = this.parameterSerialization(mid);
    return this.http.post('http://' + this.url + '/element/find/devicename/sensorname', body, {
      headers: this.headers
    });
  }
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
}
class SystemModular {
  status: string;
  system: Array<System> = [];
}
class Module {
  mid: string;
  mname: string;
}
class System {
  sysid: string;
  sysname: string;
  module: Module;
}
