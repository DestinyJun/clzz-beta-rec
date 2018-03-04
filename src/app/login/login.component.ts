import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernames: string;
  passwords: string;
  Login: Observable<any>;
  LoginId: string;
  cook: string;

  constructor(private route: Router) { }

  ngOnInit() {

  }

  ToMain() {
    this.route.navigate(['/home']);
  }

}
