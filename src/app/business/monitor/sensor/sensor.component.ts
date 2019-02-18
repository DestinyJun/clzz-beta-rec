import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as echarts from 'echarts';
import {LoginIdService} from '../../../login/login-id.service';
import {SensorService} from './sensor.service';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  Modular: Array<object> = [];
  proSystem = this.user.getSysids();
  ModularName: string;
  proSystemName: string;
  ModularId: string;
  ModalChart: any;
  DeviceSensorJson: Array<object> = [];
  DeviceSensor: Array<any> = [];
  option: any;
  Datas: any;
  interval: any;
  modal3: any;
  constructor(private activatedRoute: ActivatedRoute, private http: SensorService, private user: LoginIdService) {
    this.proSystemName = this.proSystem[0]['sysName'];
    this.ModularInit();
  }
  ngOnInit() {
    console.log(this.user.getSysids()[0]);
    this.DeviceSensorInit(this.ModularId);
    this.interval = setInterval(() => {this.DeviceSensorInit(this.ModularId); console.log(1); }, 3000);
    // setInterval(() => {this.DeviceSensorInit(this.ModularId); console.log(1); }, 3000);
    // setInterval(() => console.log(2), 1000);
  }
  // 获取系统下模块
  ModularInit() {
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystemName === this.proSystem[i]['sysName']) {
        this.http.findSystemModular({sysIds: this.proSystem[i]['sysId']})
          .subscribe( data => {
            console.log(data);
            this.Modular = data['values'];
            console.log(this.Modular);
            if (this.Modular !== null) {
              this.ModularName = this.Modular[0]['mName'];
              this.ModularIdInit();
            } else {
              this.DeviceSensor = [];
            }
          });
        break;
      }
    }

  }
  // 模块Id初始化
  ModularIdInit() {
    for (let i = 0; i < this.Modular.length; i++) {
      if (this.ModularName === this.Modular[i]['mName']) {
        this.ModularId = this.Modular[i]['mId'];
        this.DeviceSensorInit(this.ModularId);
        break;
      }
    }
    // clearInterval(this.interval);
    // this.interval = setInterval(() => this.DeviceSensorInit(i['mid']), 3000);
  }
  selectModular(mName) {
    console.log(mName, this.ModularName);
    if (mName !== this.ModularName) {
      this.ModularName = mName;
      this.ModularIdInit();
    }
  }
  selectSystem(sid) {
    if (sid !== this.proSystemName) {
      this.proSystemName = sid;
      this.ModularInit();
    }
  }
// 获取模块下设备传感器最新值-id
  DeviceSensorInit(mId) {
    console.log(mId);
    this.http.FindDevicenameSensornameSensordata({mId: mId})
      .subscribe(data => {
        console.log(data);
        if (data['values'] === null) {
          this.DeviceSensorInitRec(mId);
        } else {
          this.DeviceSensorJson = data['values'];
          this.oneTwo();
        }
      });
  }
// 无传感器最新值, 使用这个
  DeviceSensorInitRec(mId) {
    this.http.findDeviceNameSensorName({mId: mId})
      .subscribe(data => {
        console.log(data);
        this.DeviceSensorJson = data['values'];
        console.log(this.DeviceSensorJson);
        this.oneTwo();
      });
  }
  // 重构成{one:{name, data, sid},two:{name,data, sid}}
  oneTwo() {
    this.DeviceSensor = [];
    const length = this.DeviceSensorJson.length;
    for (let i = 0; i < length - 1; i += 2) {
      this.DeviceSensor[i / 2] = {
        one: {name: this.DeviceSensorJson[i]['dName'] + '___' + this.DeviceSensorJson[i]['sName'],
          data: this.DeviceSensorJson[i]['sData'] || '已停机', sId: this.DeviceSensorJson[i]['sId']},
        two: {name: this.DeviceSensorJson[i + 1]['dName'] + '___' + this.DeviceSensorJson[i + 1]['sName'],
          data: this.DeviceSensorJson[i + 1]['sData'] || '已停机', sId: this.DeviceSensorJson[i]['sId']}
      };
    }
    if (length / 2) {
      this.DeviceSensor[(length - 1) / 2] = {
        one: {name: this.DeviceSensorJson[length - 1]['dName'] + '___' + this.DeviceSensorJson[length - 1]['sName'],
          data: this.DeviceSensorJson[length - 1]['sData'] || '已停机', sId: this.DeviceSensorJson[length - 1]['sId']},
        two: null
      };
    }
    console.log(this.DeviceSensor);
  }
  MapChart(sId: string, SensorName: string, starttime: string, deadline: string) {
    this.Datas = this.http.findHistorySensorData({sId: sId, startTime: starttime, deadline: deadline});
    this.Datas.subscribe(d => {
      console.log(d);
      const dates = [];
      const data = [];
      if (d['values'] !== null) {
        const length = d['values'].length;
        const DLength = d['values'].length;
        for (let j = 0; j < DLength; j++) {
          dates[j] = (d['values'][j]['sTime']);
          data[j] = (d['values'][j]['sData']);
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
          text: SensorName,
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
  deleteInterval() {
    clearInterval(this.modal3);
  }
  modal2(value) {
    clearInterval(this.modal3);
    this.modal3 = setInterval(() => this.MapChart(value.sId, value.name,
      this.user.toDatestart(new Date()), this.user.toDateend(new Date())), 2000);
    console.log(value);
  }
  ReSize(event) {
    this.ModalChart = event;
  }
  ReSizeInit() {
    setTimeout(() => this.ModalChart.resize(), 500);
  }
}
