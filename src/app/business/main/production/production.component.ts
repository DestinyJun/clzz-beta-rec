import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginIdService} from '../../../login/login-id.service';
import {Url} from '../../../getUrl';
import {options} from './option';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {
  order = new Order();
  url = new Url().getUrl();
  options: any;
  ModalChart: any;
  length = 0;
  bt = [];
  ft = [];
  pt = [];
  dateTime = [];
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private user: LoginIdService) {
    this.http.post('http://' + this.url + '/element/hostMessage', 'sysids=' + this.user.getSysids()[0]['sysId'], {
      headers: this.headers
    }).subscribe(data => {
      console.log(data);
      this.order = data['values']['datas'][0];
      for (let i = 0; i < data['values']['thickness'].length; i++) {
        this.bt[i] = data['values']['thickness'][i]['bottomThickness'];
        this.ft[i] = data['values']['thickness'][i]['finishThickness'];
        this.pt[i] = data['values']['thickness'][i]['plateThickness'];
        this.dateTime[i] = data['values']['thickness'][i]['datetime'];
        this.length = data['values']['length'];
      }
      this.initOption();
      });
  }

  ngOnInit() {
  }
  initMapData() {
    this.http.post('http://' + this.url + '/element/find/thickness/sensor', 'sysids=' +
      this.user.getObject('user').sysids, {headers: this.headers}).subscribe(data => {
      console.log(data);
      const length = data['values'].length;
    });
  }
  initOption() {
    this.options = {
      tooltip : {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#269b97'
          }}},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5px',
        containLabel: true
      },
      xAxis : [{
        type: 'category',
        height: '100%',
        boundaryGap: false,
        data: this.dateTime,
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        }
      }],
      series: [{
        name: '底漆厚度',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: this.bt
      },
        {
          name: '铝板厚度',
          type: 'line',
          stack: '总量',
          areaStyle: {normal: {color: '#269b97'}},
          data: this.pt
        },
        {
          name: '面漆厚度',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: {normal: {}},
          data: this.ft
        }
      ]
    };
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
