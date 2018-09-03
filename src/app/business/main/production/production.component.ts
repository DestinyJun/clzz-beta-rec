import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginIdService} from '../../../login/login-id.service';
import {Url} from '../../../getUrl';
import {options} from './option';
import {s} from '@angular/core/src/render3';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  order = new Order();
  url = new Url().getUrl();
  options = options;
  public ModalChart: any;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private user: LoginIdService) {
    this.http.post('http://' + this.url + '/element-plc/order/audited', 'sysids=' + this.user.getObject('user').sysids, {
      headers: this.headers
    }).subscribe(data => {
        console.log(data);
        const length = data['values'].length;
        for (let i = 0; i < length; i++) {
          if (data['values'][i]['status'] === 2) {
            this.order = data['values'][i];
            break;
          }
        }
      });
  }

  ngOnInit() {
  }
  toDatestart(time) {
    let Hours = time.getHours(), Minutes = time.getMinutes();
    if ( Minutes < 20) {
      Minutes += 40;
      Hours -= 1;
    } else {
      Minutes -= 20;
    }
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
      + ' ' + Hours + ':' + Minutes + ':' + time.getSeconds();
  }

  toDateend(time) {
    return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
      + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  }
  initMapData() {
    this.http.post('http://' + this.url + '/element/find/thickness/sensor', 'sysids=' +
      this.user.getObject('user').sysids, {headers: this.headers}).subscribe(data => {
      console.log(data);
      const length = data['values'].length;
    });
  }
  timeData(sid, starttime, deadline) {
    const body = {
      sid: sid,
      starttime: starttime,
      deadline: deadline
    };
    this.http.post('http://' + this.url + '/element/find-hstory-sensordata', this.parameterSerialization(body), {
      headers: this.headers
    });
  }
  ReSize(event) {
    this.ModalChart = event;
  }
  ReSizeInit() {
    setTimeout(() => this.ModalChart.resize(), 200);
  }
  parameterSerialization(obj: object): string {
    let result: string;
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (!result) {
          result = prop + '=' + obj[prop];
        } else {
          result += '&' + prop + '=' + obj[prop];
        }
      }
    }
    return result;
  }
}
export class Order {
  altype: string;
  allength: string;
  alwidth: string;
  althickness: string;
  ftype: string;
  fthickness: string;
  cname: string;
  exshiptime: string;
}
