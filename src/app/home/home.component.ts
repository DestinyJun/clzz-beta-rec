import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginIdService} from '../login/login-id.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Url} from '../getUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  State = 'in';
  @Output() InfoTg = new EventEmitter();
  @Output() sidebar = new EventEmitter();
  ToastInformation: string;
  country: Array<any>;
  province: Array<any>;
  city: Array<any>;
  position: any;
  constructor() {
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
