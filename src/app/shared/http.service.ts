import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }
  // 获取事件
  getEvent(): Observable<any> {
    const body = {
      'page': '1',
      'row': '10'
    };
    return this.http.post('http://120.78.137.182/element/query-event', body);
  }

  // 设备ID查看传感器
  SeeDeviceSensor(DId): Observable<any> {
    const body = '{\n' +
      '\t\t"did":"' + DId + '"\n' +
      '}';
    return this.http.post('http://120.78.137.182/colorbond-consumer/SeeDeviceSensor', body);
  }

  // 模块ID查看设备传感器
  SeeModularDeviceSensor(MId): Observable<any> {
    const body = '{\n' +
      '\t\t"mid":"' + MId + '"\n' +
      '}';
    return this.http.post('http://120.78.137.182/colorbond-consumer/SeeModular-Device-Sensor', body);
  }

// 获取模块数据
  SeeAdministration(): Observable<any> {
    return this.http.post('http://120.78.137.182/colorbond-consumer/SeeAdministration', '');
  }

  // 传感器ID获取传感器数据
  seesensordata(body): Observable<any> {
    const bodyM = '{\n' +
      '\t"sid":"' + body + '"\n' +
      '}';
    console.log(bodyM);
    return this.http.post('http://120.78.137.182/colorbond-consumer/seesensordata', bodyM);
  }

}
export class NameId {
  name: string|any;
  id: string|any;
}
export class OrderList {
  constructor(
    public id: number,
    public name: string,
    public details: string,
    public time: string,
    public Aluminumt: string,
    public Aluminuml: string,
    public Aluminumb: string,
    public Paintc: string,
    public Paintt: string,
    public primerc: string,
    public primertt: string,
    public Ofpaintc: string,
    public Ofpaintt: string,
    public Doublesided: boolean,
    public time1: string,
    public time2: string
  ) {}
}
