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
  constructor(private route: Router, private fb: FormBuilder, private http: HttpClient, private Id: LoginIdService) {
    this.user = this.fb.group( {
      username: ['', Validators.required],
      passwords: ''
    });
  }
  ngOnInit() {}
  ToMain() {
    const body = '{\n' +
      '\t"uname":"' + this.user.get('username').value + '",\n' +
      '\t"upwd":"' + this.user.get('passwords').value + '",\n' +
      '\t"module":"WEBN"\n' +
      '}';
    this.http.post('http://120.78.137.182/element-admin/user/login', body)
      .subscribe(data => {
        if (data['status'] === '10') {
          this.Id.set('userId', data['sid']);
          this.Id.set('userName', this.user.get('username').value);
          console.log(this.Id);
          this.route.navigate(['/home']);
        } else if (data['status'] === '14') {
          window.confirm('用户已在线');
        } else {
          window.confirm('用户名或密码错误');
        }
      });
  }

}
