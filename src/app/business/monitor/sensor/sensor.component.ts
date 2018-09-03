import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as echarts from 'echarts';
import {MonitorHttpService} from '../monitor-http.service';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  Modular: Array<object> = [];
  ModularId = 'mod0001';
  ModalChart: any;
  DeviceSensorJson: any;
  DeviceSensor: Array<any> = [];
  NoDataSensorJson: any;
  option: any;
  Datas: any;
  Modularname: string;
  interval: any;
  modal3: any;
  constructor(private activatedRoute: ActivatedRoute,
              private http: MonitorHttpService,
              private user: LoginIdService) {
    this.ModularInit();
  }
  ngOnInit() {
    this.DeviceSensorInit(this.ModularId);
    // this.interval = setInterval(() => {this.DeviceSensorInit(this.ModularId); console.log(1); }, 3000);
  }
  ModularIdInit(i) {
    this.DeviceSensorInit(i['mid']);
    clearInterval(this.interval);
    // this.interval = setInterval(() => this.DeviceSensorInit(i['mid']), 3000);
    this.ModularId = i['mid'];
    this.Modularname = i['mname'];
  }
  // 获取系统下模块
  ModularInit() {
    this.http.SeeSystemModular({sysids: this.user.getObject('user').sysids})
      .subscribe( data => {
        console.log(data);
        this.Modular = data['values'];
        this.Modularname = this.Modular[0]['mname'];
      });
  }
// 获取模块下设备-传感器-最新值-id
  DeviceSensorInit(MId) {
    console.log(MId);
    this.http.FindDevicenameSensornameSensordata({mid: MId})
      .subscribe(data => {
        console.log(data);
        data = data['values'];
        this.DeviceSensorJson = data;
        this.NoDataSensorInit(MId);
      });
  }
// 增加无数据设备传感器
  NoDataSensorInit(MId) {
    console.log(MId);
    this.http.modularDeviceSensorName({mid: MId})
      .subscribe(data => {
        console.log(data);
        this.NoDataSensorJson = data['values'];
        const putData = [];
        const lengthNo = this.NoDataSensorJson.length;
        const length = this.DeviceSensorJson.length;
        if (length === 0) {
          for (let i = 0; i < lengthNo; i++) {
            putData.push({'Name': this.NoDataSensorJson[i], 'data': '---'});
          }
        } else {
          for (let i = 0; i < lengthNo; i++) {
            for (let j = 0; j < length; j++) {
              if (this.NoDataSensorJson[i]['sid'] === this.DeviceSensorJson[j]['sid']) {
                putData.push({'Name': this.NoDataSensorJson[i], 'data': this.DeviceSensorJson[j]['sdata']});
                break;
              } else if (j === length - 1) {
                putData.push({'Name': this.NoDataSensorJson[i], 'data': '---'});
              }
            }
          }
        }
        const deviceSensor: Array<any> = [];
        let putlength = putData.length;
        if (putlength % 2 === 0) {
          for ( let i = 0; i < putlength; i += 2) {
            deviceSensor.push({'one': putData[i], 'two': putData[i + 1]});
          }
        } else {
          putlength = putlength - 1;
          for ( let i = 0; i < putlength; i += 2) {
            deviceSensor.push({'one': putData[i], 'two': putData[i + 1]});
          }
          deviceSensor.push({'one': putData[putlength], 'two': ''});
        }
        this.DeviceSensor = deviceSensor;
      });
  }

  MapChart(body: string, SensorName: string, starttime: string, deadline: string) {
    this.Datas = this.http.findhstorysensordata({sid: body, starttime: starttime, deadline: deadline});
    this.Datas.subscribe(d => {
      if (d['status'] === '10') {
        console.log(d);
        const length = d['values'].length;
        const dates = [];
        const data = [];
        const DLength = d['values'].length;
        for (let j = 0; j < DLength; j++) {
          dates.push(d['values'][j]['stime']);
          data.push(d['values'][j]['sdata']);
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
              shadowColor: 'rgba(0, 0, 0, 0.6)',
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
      } else if (d['status'] === '13') {
        console.log(d);
        console.log('id不存在');
      }
    });
  }
  deleteInterval() {
    clearInterval(this.modal3);
  }
  modal2(value) {
    clearInterval(this.modal3);
    this.modal3 = setInterval(() => this.MapChart(value.Name.sid, value.Name.sname,
      this.toDatestart(new Date()), this.toDateend(new Date())), 1000);
    console.log(value);
  }
  ReSize(event) {
    this.ModalChart = event;
  }
  ReSizeInit() {
    setTimeout(() => this.ModalChart.resize(), 500);
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
}
