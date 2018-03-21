import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usernames: string;
  public passwords: string;
  constructor(
    private route: Router,
    private http: HttpClient
  ) {}
  ngOnInit() {}
  ToMain() {
    this.route.navigate(['/home']);
  }

}
