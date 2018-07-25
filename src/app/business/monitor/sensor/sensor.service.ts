import { Injectable } from '@angular/core';
import {LoginIdService} from '../../../login/login-id.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SensorService {

  Modular: Array<object> = [];
  ModularId = 'mod0001';
  ModalChart: any;
  DeviceSensorJson: any;
  DeviceSensor: Array<any> = [];
  NoDataSensorJson: any;
  option: any;
  Datas: any;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private user: LoginIdService) { }

  // 获取系统下模块
  public ModularInit() {
    const body = this.parameterSerialization({
      sysids: this.user.getObject('user').sysids,
    });
    console.log(body);
    this.http.post<SystemModular>('http://120.78.137.182/element/SeeSystemModular', body, {
      headers: this.headers
    })
      .subscribe(data => {
        this.Modular = data['values'][0]['modular'];
      });
  }
  // 获取模块下设备-传感器-最新值-id
  DeviceSensorInit(MId) {
    this.FindDevicenameSensornameSensordata({mid: MId})
      .subscribe(data => {
        data = data['values'];
        this.DeviceSensorJson = data;
        this.NoDataSensorInit(MId);
      });
  }
// 增加无数据设备传感器
  NoDataSensorInit(MId) {
    this.modularDeviceSensorName({mid: MId})
      .subscribe(data => {
        this.NoDataSensorJson = data['values'];
        const putData = [];
        const lengthNo = this.NoDataSensorJson.length;
        const length = this.DeviceSensorJson.length;
        if (length === 0) {
          for (let i = 0; i < lengthNo; i++) {
            putData.push({'Name': this.NoDataSensorJson[i], 'data': '---'});
          }
        } else {
          for (let i = 0; i < lengthNo; i++) {
            for (let j = 0; j < length; j++) {
              if (this.NoDataSensorJson[i]['sid'] === this.DeviceSensorJson[j]['sid']) {
                putData.push({'Name': this.NoDataSensorJson[i], 'data': this.DeviceSensorJson[j]['sdata']});
                break;
              } else if (j === length - 1) {
                putData.push({'Name': this.NoDataSensorJson[i], 'data': '---'});
              }
            }
          }
        }
        const deviceSensor: Array<any> = [];
        let putlength = putData.length;
        if (putlength % 2 === 0) {
          for ( let i = 0; i < putlength; i += 2) {
            deviceSensor.push({'one': putData[i], 'two': putData[i + 1]});
          }
        } else {
          putlength = putlength - 1;
          for ( let i = 0; i < putlength; i += 2) {
            deviceSensor.push({'one': putData[i], 'two': putData[i + 1]});
          }
          deviceSensor.push({'one': putData[putlength], 'two': ''});
        }
        this.DeviceSensor = deviceSensor;
      });
  }
  public SeeSystemModular(sysid: object): Observable<any> {
    const body = this.parameterSerialization(sysid);
    return this.http.post('http://120.78.137.182/element/SeeSystemModular', body, {
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
