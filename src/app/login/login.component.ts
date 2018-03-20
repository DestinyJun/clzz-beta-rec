import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public sid: string;
  constructor(private route: Router, private fb: FormBuilder, private http: HttpClient) {
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
    console.log(body);
    this.http.post('http://120.78.137.182/element-admin/user/login', body)
      .subscribe(data => {
        console.log(data);
        if (data['status'] === '10') {
          this.sid = data['sid'];
          this.route.navigate(['/home']);
        } else {
          window.confirm('用户名或密码错误');
        }
      });
  }

}
