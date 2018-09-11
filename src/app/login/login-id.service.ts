import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Url} from '../getUrl';
@Injectable()
export class LoginIdService {
  url = new Url().getUrl();
  public sessionStorage: any;
  constructor(private http: HttpClient, private route: Router) {
    this.sessionStorage = sessionStorage;
  }

  public set(key: string, value: string | boolean): void {
    this.sessionStorage[key] = value;
  }

  public get(key: string): string | boolean {
    return this.sessionStorage[key] || false;
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
  public setAddress(value: any): void {
    this.sessionStorage['address'] = JSON.stringify(value);
  }
  public getAddress(): any {
    return JSON.parse(this.sessionStorage['address'] || '{}');
  }
  public setObject(key: string, value: User): void {
    this.sessionStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): User | any {
    return JSON.parse(this.sessionStorage[key] || '{}');
  }

  public remove(key: string): any {
    this.sessionStorage.removeItem(key);
  }

  public login(name: string, password: string): string | void { // 用户登录:用户名 密码
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
          this.route.navigate(['/home']);
        } else if (data['status'] === '14') {
          console.log(data.sid);
          this.setObject('user', data);
          this.route.navigate(['/home']);
          this.setBool('loginStatus', true);
        } else {
          this.setBool('loginStatus', false);
          return '用户名密码错误';
        }
      });
  }
  jieXiSysids(sysids: string[]) {
    const str = [];
    for (let i = 1; i < sysids.length - 1; i++) {
      let s = '';
      while (sysids[i] !== ',' && i < sysids.length - 1) {
        s += sysids[i];
        i++;
      }
      str.push(s);
    }
    return str;
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
  setProSystem() {
    this.http.post('http://' + this.url + '/element/find-prosystem', '')
      .subscribe(data => {
        console.log(data);
      });
  }
}

class User {
  realName: string;
  sid: string;
  status: string;
  sysids: string;
}
