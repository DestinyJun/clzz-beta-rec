import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {

  Datas: Observable<any>;
  DataSet: Array<any> = [];
  DataValue: Array<number> = [];
  Modular: Array<any> = [];
  ModularJson: any;
  ModularId = 'mod0001';
  DeviceSensorJson: any;
  DeviceSensor: Array<any> = [];
  NoDataSensorJson: any;
  option: any;
  SetMap: any;
  Modularname: string;
  constructor(private activatedRoute: ActivatedRoute,
              private httpSensor: HttpClient,
              private httpAdmin: HttpClient,
              private httpDeviceSensor: HttpClient,
              private httpNoDataSensor: HttpClient) {}
  ngOnInit() {
    this.ModularInit();
    this.DeviceSensorInit(this.ModularId);
  }
  ModularIdInit(i) {
    this.DeviceSensorInit(i['mid']);
    this.ModularId = i['mid'];
    this.Modularname = i['mname'];
  }
  // 获取系统下模块
  ModularInit() {
    const body = '{\n' +
      '\t"sysid":"sys0001"\n' +
      '}';
    this.httpAdmin.post('http://120.78.137.182/element/SeeSystemModular', body)
      .subscribe( data => {
        console.log(data);
        data = data['system'][0]['modular'];
        this.ModularJson = data;
        console.log(this.ModularJson);
        const length = this.ModularJson.length;
        for (let i = 0; i < length; i++) {
          this.Modular.push(this.ModularJson[i]);
        }
      });
  }
// 获取模块下设备-传感器-最新值-id
  DeviceSensorInit(MId) {
    const body = '{\n' +
      '\t"mid":"' + MId + '"\n' +
      '}';
    console.log(body);
    this.httpDeviceSensor.post('http://120.78.137.182/element/find/devicename/sensorname/sensordata', body)
      .subscribe(data => {
        console.log(data);
        data = data['values'];
        this.DeviceSensorJson = data;
        this.NoDataSensorInit(MId);
      });
  }
// 增加无数据设备传感器
  NoDataSensorInit(MId) {
    const body = '{\n' +
      '\t"mid":"' + MId + '"\n' +
      '}';
    console.log(body);
    this.httpNoDataSensor.post('http://120.78.137.182/element/find/modular/device/sensor/name', body)
      .subscribe(data => {
        console.log(data);
        this.NoDataSensorJson = data['values'];
        console.log(this.NoDataSensorJson);
        console.log(this.DeviceSensorJson);
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
              } else if (j === length - 1) {
                putData.push({'Name': this.NoDataSensorJson[i], 'data': '---'});
              }
            }
          }
        }
        console.log(putData);
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
        console.log(deviceSensor);
        this.DeviceSensor = deviceSensor;
        console.log(this.DeviceSensor);
      });
  }
  // 动态图表
 /* SetMapChart(body: string, SensorName: string) {
    this.SetMap = setInterval(() => this.MapChart(body, SensorName), 2000);
  }*/
  StopMapChart() {
    clearInterval(this.SetMap);
  }
  /*MapChart(body: string, SensorName: string) {
    const year = [];
    const month = [];
    const date = [];
    const hours = [];
    const minutes = [];
    const seconds = [];
    const dataValue = [];
    const bodyM = '{\n' +
      '\t"sid":"' + body + '"\n' +
      '}';
    console.log(bodyM);
    this.Datas = this.httpSensor.post('http://120.78.137.182/element/seesensordata', bodyM);
    this.Datas.subscribe(d => {
      if (d['status'] === '10') {
        console.log(d);
        this.DataSet = d;
        const length = this.DataSet['values'].length;
        for (let i = 0; i < length; i++) {
          const datee = this.DataSet['values'][i]['stime'];
          const datev = this.DataSet['values'][i]['sdata'];
          year.push(this.ToNumber(datee, 0, 4));
          month.push(this.ToNumber(datee, 5, 2));
          date.push(this.ToNumber(datee, 8, 2));
          hours.push(this.ToNumber(datee, 11, 2));
          minutes.push(this.ToNumber(datee, 14, 2));
          seconds.push(this.ToNumber(datee, 17, 2));
          dataValue.push(Number(datev));
        }
        const dates = [];

        const data = [];

        for (let i = 1; i < length; i++) {
          const now = new Date(year[i], month[i], date[i], hours[i], minutes[i], seconds[i]);
          dates.push([now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()].join('-'));
          data.push(dataValue[i]);
        }
        this.option = {
          tooltip: {
            trigger: 'axis',
            color: '#21333f',
            position: function (pt) {
              return [pt[0], '0%'];
            }
          },
          title: {
            left: 'center',
            text: SensorName + '数据图',
            textStyle: {
              color: '#21333f'
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dates,
            axisLabel: {
              textStyle: {
                color: '#21333f'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#21333f'
              }
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            axisLabel: {
              textStyle: {
                color: '#21333f'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#21333f'
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
        console.log('无数据');
      }
    });
  }*/

  ToNumber(S: string, start: number, long: number): number {
    let N = 0;
    let lo = long;
    for (let i = start; i < start + long; i++) {
      N = N + Number(S[i]) * Math.pow(10, lo - 1);
      lo--;
    }
    return N;
  }

}
