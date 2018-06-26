import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginIdService} from '../remind/login-id.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public sid: string;
  public tips: string;
  constructor(private route: Router, private fb: FormBuilder, private http: HttpClient, private Id: LoginIdService) {
    this.user = this.fb.group( {
      username: ['', Validators.required],
      passwords: ''
    });
  }
  ngOnInit() {}
  ToMain() {
    const body = {
      uname: this.user.get('username').value,
      upwd: this.user.get('passwords').value ,
      module: 'WEBN'
      };
    this.http.post('http://120.78.137.182/element-admin/user/login', body)
      .subscribe(data => {
        if (data['status'] === '10') {
          this.Id.set('userId', data['sid']);
          this.Id.set('userName', this.user.get('username').value);
          this.route.navigate(['/home']);
        } else if (data['status'] === '14') {
          this.tips = '用户已在线';
        } else {
          this.tips = '用户名或密码错误';
        }
      });
  }

}
