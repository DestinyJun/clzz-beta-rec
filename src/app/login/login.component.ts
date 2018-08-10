import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {LoginIdService} from './login-id.service';
import {Subject} from 'rxjs/Subject';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public sid: string;
  public tips: string | void;
  constructor(private route: Router, private fb: FormBuilder, private loginService: LoginIdService) {
    this.user = this.fb.group( {
      username: ['', Validators.required],
      passwords: '',
    });
  }
  ngOnInit() {}
  login() {
    const username = String(this.user.get('username').value),
      passwords = String(this.user.get('passwords').value);
    this.tips = this.loginService.login(username, passwords); // 提示登录状态
    // this.loginService.setProSystem();
  }
}
