import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginIdService} from '../login/login-id.service';

@Injectable()
export class HttpService {
  public addEvent: EventEmitter<string> = new EventEmitter();
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private user: LoginIdService) { }

  // 获取事件
  getEvent(page, row): Observable<any> {
    const body = this.parameterSerialization({
      'page': page,
      'row': row,
      'sysids': this.user.getObject('user').sysids
    });
    console.log(body);
    return this.http.post('http://120.78.137.182/element/query-event', body, {
      headers: this.headers
    });
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
