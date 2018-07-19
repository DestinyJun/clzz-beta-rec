import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable()
export class LoginIdService {

  static user: User; // 设置静态用户信息,保证唯一性
  static loginStatus: boolean;
  constructor(private http: HttpClient, private route: Router) {
  }

  public set(key: string, value: string): void {
    LoginIdService.user[key] = value;
  }

  public get(key: string): string {
    return LoginIdService.user[key];
  }

  public getLoginStatus(): boolean {
    return LoginIdService.loginStatus;
  }

   setObject(obj: User): void {
    LoginIdService.user = obj;
  }

  public getObject(key: string): any {
    return LoginIdService.user;
  }

  public remove(key: string): any {
    LoginIdService.user[key] = undefined;
  }

  public login(name: string, password: string): string | void { // 用户登录:用户名 密码
    const body = {
      uname: name,
      upwd: password,
      module: 'WEBN'
    };
    console.log(body);
    this.http.post<User>('http://120.78.137.182/element-admin/user/login', body)
      .subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          LoginIdService.user = data;
          LoginIdService.loginStatus = true;
          this.route.navigate(['/home']);
        } else if (data['status'] === '14') {
          LoginIdService.user = data;
          LoginIdService.loginStatus = true;
          this.route.navigate(['/home']);
        } else {
          LoginIdService.loginStatus = false;
          return '用户名密码错误';
        }
      });
  }
  public loginOut(): boolean { // 用户退出
    const sid = { sid: LoginIdService.user.sid };
    this.http.post('http://120.78.137.182/element-admin/user/logout', sid)
      .subscribe(data => {});
    return true;
  }
  public updateTime() {
    const sid = { sid: LoginIdService.user.sid };
    this.http.post('http://120.78.137.182/element-admin/user/sid-update', sid)
      .subscribe(data => {});
  }
  public SingleSignOn(): boolean {
    if (this.get('date')) {
      return false;
    } else {
      const date1 = Number(this.get('date'));
      const date2 = new Date().valueOf();
      if (date2 - date1 < 10) {
        this.set('date', String(new Date().valueOf()));
        return true;
      } else {
        return false;
      }
    }
  }
}

class User {
  realName: string;
  sid: string;
  status: string;
  sysids: Array<string>;
}
