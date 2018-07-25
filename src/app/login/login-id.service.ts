import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable()
export class LoginIdService {
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
  public getBool(key: string): boolean {
    return this.sessionStorage[key] || false;
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
    this.http.post<User>('http://120.78.137.182/element-admin/user/login', body)
      .subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          this.setObject('user', data);
          console.log(this.sessionStorage);
          this.set('loginStatus', true);
          this.route.navigate(['/home']);
        } else if (data['status'] === '14') {
          console.log(data.sid);
          this.setObject('user', data);
          this.route.navigate(['/home']);
          this.set('loginStatus', true);
        } else {
          this.set('loginStatus', false);
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
  public loginOut(): boolean { // 用户退出
    const sid = { sid: this.getObject('user').sid };
    this.http.post('http://120.78.137.182/element-admin/user/logout', sid)
      .subscribe(data => {});
    return true;
  }
  public updateTime() {
    const sid = { sid: this.getObject('user').sid };
    this.http.post('http://120.78.137.182/element-admin/user/sid-update', sid)
      .subscribe(data => {});
  }
}

class User {
  realName: string;
  sid: string;
  status: string;
  sysids: string;
}
