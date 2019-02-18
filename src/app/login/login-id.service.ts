import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Url} from '../getUrl';
@Injectable()
export class LoginIdService {
  url = new Url().getUrl();
  sessionStorage: any;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private route: Router) {
    this.sessionStorage = sessionStorage;
  }

  public set(key: string, value: string | boolean): void {
    this.sessionStorage[key] = value;
  }

  public get(key: string): any {
    return this.sessionStorage[key] || false;
  }
  public setName(value: string | boolean): void {
    this.sessionStorage['realName'] = value;
  }
  public getName(): string | boolean {
    return this.sessionStorage['realName'] || false;
  }
  public setBool(key: string, value: boolean): void {
    this.sessionStorage[key] = value;
  }
  public getBool(key: string): boolean {
    return this.sessionStorage[key] || false;
  }
  public setSysids(value: any): void {
    this.sessionStorage['sysids'] = JSON.stringify(value);
  }
  public getSysids(): any {
    return JSON.parse(this.sessionStorage['sysids'] || '{}');
  }
  public setPosition(value: any): void {
    this.sessionStorage['position'] = JSON.stringify(value);
  }
  public getPosition(): any {
    return JSON.parse(this.sessionStorage['position'] || '{}');
  }
  public setAddress(value: any): void {
    this.sessionStorage['address'] = JSON.stringify(value);
  }
  public getAddress(): any {
    return JSON.parse(this.sessionStorage['address'] || '{}');
  }
  public setObject(key: string, value: any): void {
    this.sessionStorage[key] = JSON.stringify(value);
  }
  public setOrder(value: any): void {
    this.sessionStorage['order'] = JSON.stringify(value);
  }
  public getOrder(): any {
    return JSON.parse(this.sessionStorage['order'] || '{}');
  }
  public getObject(key: string): User | any {
    return JSON.parse(this.sessionStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.sessionStorage.removeItem(key);
  }

  public login(name: string, password: string): string | void { // 用户登录:用户名 密码
    this.initPosition();
    const body = {
      uname: name,
      upwd: password,
      module: 'WEBN'
    };
    this.http.post<User>('http://' + this.url + '/element-admin/user/login', body)
      .subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          this.setObject('user', data);
          console.log(this.sessionStorage);
          this.setBool('loginStatus', true);
          this.setSysids(JSON.parse(data['systemInfo']));
          this.setName(name);
          this.route.navigate(['/home/true']);
        } else if (data['status'] === '14') {
          console.log(data.sid);
          this.setObject('user', data);
          this.setSysids(JSON.parse(data['systemInfo']));
          this.route.navigate(['/home/true']);
          this.setBool('loginStatus', true);
          this.setName(name);
        } else {
          this.setBool('loginStatus', false);
          return '用户名密码错误';
        }
      });
  }
  loginOut(): boolean { // 用户退出
    const sid = { sid: this.getObject('user').sid };
    this.http.post('http://'  + this.url + '/element-admin/user/logout', sid)
      .subscribe(data => {});
    return true;
  }
  updateTime() {
    const sid = { sid: this.getObject('user').sid };
    this.http.post('http://'  + this.url + '/element-admin/user/sid-update', sid)
      .subscribe(data => {});
  }
  findCountryProvinceCity() {
    return this.http.post('http://' + this.url + '/element/find-country-province-city', '', {
      headers: this.headers
    });
  }
  setProSystem() {
    this.http.post('http://' + this.url + '/element/find-prosystem', '')
      .subscribe(data => {
        console.log(data);
      });
  }
  initPosition() {
    this.findCountryProvinceCity().subscribe(data => {
      console.log(data);
      const position: Array<any> = [];
      let country: string, province: string, city: string;
      for (let i = 0, ic = 0, ip = 0, _ic = 0; i < data['values'].length; i++) {
        if (ic === 0 || country !== data['values'][i]['country']) {
          position[ic] = {name: data['values'][i]['country'],
            province: [{name: data['values'][i]['province'], city: [data['values'][i]['city']]}]};
          ic++;
          ip = 1;
          _ic = 1;
          country = data['values'][i]['country'];
          province = data['values'][i]['province'];
          city = data['values'][i]['city'];
        } else {
          if (province !== data['values'][i]['province']) {
            position[ic - 1]['province'][ip] = {name: data['values'][i]['province'], city: [data['values'][i]['city']]};
            ip++;
            _ic = 1;
            province = data['values'][i]['province'];
          } else {
            position[ic - 1]['province'][ip - 1]['city'][_ic] = data['values'][i]['city'];
            _ic++;
          }
        }
      }
      console.log(position);
      this.setPosition(position);
    });
  }
  toDatestart(time) {
    let Hours = time.getHours(), Minutes = time.getMinutes();
    if (Minutes < 20) {
      Minutes += 40;
      Hours -= 1;
    } else {
      Minutes -= 20;
    }
    return time.getFullYear() + '-' + this.addZero(time.getMonth() + 1) + '-' + this.addZero(time.getDate())
      + ' ' + this.addZero(Hours) + ':' + this.addZero(Minutes) + ':' + this.addZero(time.getSeconds());
  }

  toDateend(time) {
    return time.getFullYear() + '-' + this.addZero(time.getMonth() + 1) + '-' + this.addZero(time.getDate())
      + ' ' + this.addZero(time.getHours()) + ':' + this.addZero(time.getMinutes()) + ':' + this.addZero(time.getSeconds());
  }

  addZero(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  }
}

class User {
  realName: string;
  sid: string;
  status: string;
  sysids: Array<string>;
}
