import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import * as echarts from 'echarts';
import {EquipmentHttpService} from '../equipment-http.service';
import {slideToRight} from '../../../routeAnimation';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.css'],
})
export class DeviceHistoryComponent implements OnInit {
  sid: string;
  option: any;
  proSystem: Array<object> = [];
  modular: Array<object> = [];
  device: Array<object> = [];
  sensor: Array<object> = [];
  proSystemName: string;
  modularName: string;
  deviceName: string;
  sensorName: string;
  startTime: any;
  deadline: any;
  height = '0';
  constructor(
    private user: LoginIdService, private activatedRoute: ActivatedRoute, private http: EquipmentHttpService) {
    this.height = window.innerHeight - 400 + 'px';
    this.proSystem = this.user.getSysids();
    console.log(this.proSystem);
    this.proSystemName = this.proSystem[0]['sysName'];
  }

  ngOnInit() {
    this.modularInit();
  }
  /*模块初始化数据*/
  modularInit() {
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystemName === this.proSystem[i]['sysName']) {
        this.http.SeeSystemModular({sysIds: this.proSystem[i]['sysId']})
          .subscribe( data => {
            console.log(data);
            this.modular = data['values'];
            this.modularName = this.modular[0]['mName'];
            this.deviceInit();
          });
      }
    }

  }
  /*设备初始化数据*/
  deviceInit() {
    for (let i = 0; i < this.modular.length; i++) {
      if (this.modularName === this.modular[i]['mName']) {
        this.http.SeeModularDeviceSensor({mId: this.modular[i]['mId']})
          .subscribe(data => {
            console.log(data);
            this.device = data['values'][0]['device'];
            this.deviceName = this.device[0]['dName'];
            this.sensorInit();
          });
      }
    }
  }
  /*传感器初始化数据*/
  sensorInit() {
    for (let i = 0; i < this.device.length; i++) {
      if (this.deviceName === this.device[i]['dName']) {
        this.http.SeeDeviceSensor({dId: this.device[i]['dId']})
          .subscribe(data => {
            console.log(data);
            this.sensor = data['values'][0]['sensor'];
            this.sensorName = this.sensor[i]['sName'];
            this.MapChart(this.sensor[i]['sId'], this.sensor[i]['sName'],
              this.toDatestart(new Date()), this.toDateend(new Date()));
          });
      }
    }
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.modularInit();
    }
  }
  selectModular(name) {
    if (name !== this.modularName) {
      this.modularName = name;
      this.deviceInit();
    }
  }
  selectDevice(name) {
    if (name !== this.deviceName) {
      this.deviceName = name;
      this.sensorInit();
    }
  }
  selectSensor(name) {
    if (name !== this.sensorName) {
      this.sensorName = name;
      for (let i = 0; i < this.sensor.length; i++) {
        if (this.sensorName === this.sensor[i]['sName']) {
          this.MapChart(this.sensor[i]['sId'], this.sensorName,
            this.numberTime(this.startTime) || this.toDatestart(new Date()),
            this.numberTime(this.deadline) || this.toDateend(new Date()));
          break;
        }
      }
    }
  }
  seeHistory() {
    // enum Month {Jan = 1, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec}
    console.log(this.startTime, this.deadline);
    for (let i = 0; i < this.sensor.length; i++) {
      if (this.sensorName === this.sensor[i]['sName']) {
        this.MapChart(this.sensor[i]['sId'], this.sensorName,
          this.numberTime(this.startTime),
          this.numberTime(this.deadline));
        break;
      }
    }
  }
  numberMonth(month: string) {
    if (month === 'Jan') {
      return 1;
    }
    if (month === 'Feb') {
      return 2;
    }
    if (month === 'Mar') {
      return 3;
    }
    if (month === 'Apr') {
      return 4;
    }
    if (month === 'May') {
      return 5;
    }
    if (month === 'Jun') {
      return 6;
    }
    if (month === 'Jul') {
      return 7;
    }
    if (month === 'Aug') {
      return 8;
    }
    if (month === 'Sep') {
      return 9;
    }
    if (month === 'Oct') {
      return 10;
    }
    if (month === 'Nov') {
      return 11;
    }
    if (month === 'Dec') {
      return 12;
    }
  }
  numberTime(time) {
    if (time === undefined) {
      return null;
    }
    const sTime = time.toString().split(' ');
    return sTime[3] + '-' + this.numberMonth(sTime[1]) + '-' + sTime[2] + ' ' + sTime[4];
  }
  MapChart(body: string, SensorName: string, starttime: string, deadline: string) {
    this.http.findhstorysensordata({sId: body, startTime: starttime, deadline: deadline})
      .subscribe(d => {
        console.log(d);
      const dates = [];
      const data = [];
      if (d['values'] !== null) {
        const length = d['values'].length;
        for (let j = 0; j < length; j++) {
          dates.push(d['values'][j]['sTime']);
          data.push(d['values'][j]['sData']);
        }
      } else if (d['status'] === '13') {
        console.log(d);
        console.log('id不存在');
      }
      this.option = {
        tooltip: {
          trigger: 'axis',
          color: '#fff',
          position: function (pt) {
            return [pt[0], '0%'];
          }
        },
        title: {
          left: 'left',
          text: SensorName + '数据图',
          textStyle: {
            color: '#fff'
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dates,
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
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
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
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 100
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,' +
            '9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.' +
            '4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(255,255,255,0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: '传感器数据',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'rgb(255, 70, 131)'
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgb(255, 70, 131)'
                }, {
                  offset: 1,
                  color: 'rgb(255, 158, 68)'
                }])
              }
            },
            data: data
          }
        ]
      };
    });
  }
  toDatestart(time) {
    let Hours = time.getHours(), Minutes = time.getMinutes();
    if (Minutes < 20) {
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
}
export class MyModel {

  value: Date;

}
