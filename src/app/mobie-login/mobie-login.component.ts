import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-mobie-login',
  templateUrl: './mobie-login.component.html',
  styleUrls: ['./mobie-login.component.css']
})
export class MobieLoginComponent implements OnInit {

  public tips: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    const body = {
      uname: this.route.snapshot.params['username'],
      upwd: this.route.snapshot.params['password'],
      module: 'WEBN'
    };
    if (this.route.snapshot.params['web'] === 'main') {
      this.http.post('http://120.78.137.182/element-admin/user/login', body)
        .subscribe(data => {
          if (data['status'] === '10') {
            this.router.navigate(['/home']);
          } else if (data['status'] === '14') {
            this.tips = '用户已在线';
          } else {
            this.tips = '用户名或密码错误';
          }
        });
    } else if (this.route.snapshot.params['web'] === 'sensor') {
      this.http.post('http://120.78.137.182/element-admin/user/login', body)
        .subscribe(data => {
          if (data['status'] === '10') {
            this.router.navigate(['/home/monitor/sensor']);
          } else if (data['status'] === '14') {
            this.tips = '用户已在线';
          } else {
            this.tips = '用户名或密码错误';
          }
        });
    }
  }

  ngOnInit() {
  }

}
