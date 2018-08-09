import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {slideToRight} from '../routeAnimation';
import {leftToRight} from './sidebar/sidebarAnimation';
import {ToastService} from '../remind/toast.service';
import {LoginIdService} from '../login/login-id.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Url} from '../getUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [slideToRight, leftToRight]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routerAnimate') state;
  State = 'in';
  url = new Url().getUrl();
  @Output() InfoTg = new EventEmitter();
  @Output() sidebar = new EventEmitter();
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  ToastInformation: string;
  constructor(public LoginId: LoginIdService, private http: HttpClient) {
    this.http.post('http://' + this.url + '/element/find-system-sysid', '', {
      headers: this.headers
    })
      .subscribe(data => {
        this.LoginId.setSysids(data['values']);
        console.log(this.LoginId.getSysids());
      });
}

  ToastInfo(event) {
    this.ToastInformation = event;
  }
  infoTg() {
    this.InfoTg.emit(true);
  }
  ngOnInit() {
    setInterval(() => this.wi(), 1000);
  }
  ToggleState() {
    this.State = this.State === 'in' ?  'out' : 'in';
    console.log(this.State);
  }
  wi() {
    if (window.innerWidth > 768) {
      this.State = 'in';
    }
  }
  SideBar() {
    console.log('home');
    if (window.innerWidth < 768) {
      this.ToggleState();
    }
    this.sidebar.emit(22);
  }

}
