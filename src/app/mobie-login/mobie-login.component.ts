import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginIdService} from '../login/login-id.service';
import {Url} from '../getUrl';

@Component({
  selector: 'app-mobie-login',
  templateUrl: './mobie-login.component.html',
  styleUrls: ['./mobie-login.component.css']
})
export class MobieLoginComponent implements OnInit {

  public tips: string;
  url = new Url().getUrl();
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private user: LoginIdService) {
    const body = {
      uname: this.route.snapshot.params['username'],
      upwd: this.route.snapshot.params['password'],
      module: 'WEBN'
    };
    console.log(this.route.snapshot.params['web'] === 'main');
    if (this.route.snapshot.params['web'] === 'main') {
      this.http.post<User>('http://' + this.url + '/element-admin/user/login', body)
        .subscribe(data => {
          console.log(data);
          if (data['status'] === '10') {
            this.user.setBool('loginStatus', true);
            this.user.setObject('user', data);
            this.user.setSysids(JSON.parse(data['systemInfo']));
            this.user.setName(name);
            this.router.navigate(['/home/false']);
          } else if (data['status'] === '14') {
            this.user.setBool('loginStatus', true);
            this.tips = '用户已在线';
            this.user.setObject('user', data);
            this.user.setSysids(JSON.parse(data['systemInfo']));
            this.user.setName(name);
            this.router.navigate(['/home/false']);
          } else {
            this.tips = '用户名或密码错误';
          }
        });
    } else if (this.route.snapshot.params['web'] === 'sensor') {
      this.http.post<User>('http://' + this.url + '/element-admin/user/login', body)
        .subscribe(data => {
          if (data['status'] === '10') {
            this.user.setObject('user', data);
            this.user.setBool('loginStatus', true);
            this.user.setSysids(JSON.parse(data['systemInfo']));
            this.user.setName(name);
            this.router.navigate(['/home/false/monitor/sensor']);
          } else if (data['status'] === '14') {
            this.tips = '用户已在线';
            this.user.setObject('user', data);
            this.user.setBool('loginStatus', true);
            this.user.setSysids(JSON.parse(data['systemInfo']));
            this.user.setName(name);
            console.log(14);
            this.router.navigate(['/home/false/monitor/sensor']);
          } else {
            console.log(15);
            this.tips = '用户名或密码错误';
          }
        });
    }
  }

  ngOnInit() {
  }

}
class User {
  realName: string;
  sid: string;
  status: string;
  sysids: Array<string>;
}
