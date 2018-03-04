import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import * as echarts from 'echarts';

@Component({
  selector: 'app-device-history',
  templateUrl: './device-history.component.html',
  styleUrls: ['./device-history.component.css']
})
export class DeviceHistoryComponent implements OnInit {

  sid: string;
  starttime: Date;
  deadline: Date;
  bsRangeValue: any;
  option: any;
  Datas: Observable<any>;
  Device: Array<NameId> = [];
  Modular: Array<NameId> = [];
  Sensor: Array<NameId> = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpSensor: HttpClient,
    private httpAdmin: HttpClient,
    private httpDevice: HttpClient) {}

  ngOnInit() {
    this.ModularInit();
  }
  /*模块初始化数据*/
  ModularInit(MId = 0, DId = 0) {
    const modular = [];
    this.httpAdmin.post('http://120.78.137.182/element/SeeAdministration', '')
      .subscribe( data => {
        console.log(data);
        const i: Array<any> = data['system'][0]['modular'];
        const length = i.length;
        for (let j = 0; j < length; j++) {
          const name = String(i[j]['mname']);
          const id = String(i[j]['mid']);
          modular.push({name, id});
        }
        console.log(modular);
        this.DeviceInit(modular[MId].id);
        this.Modular = modular;
      });
  }
  /*设备初始化数据*/
  DeviceInit(MId) {
    const device = [];
    const body = '{\n' +
      '\t\t"mid":"' + MId + '"\n' +
      '}';
    this.httpDevice.post('http://120.78.137.182/element/SeeModular-Device-Sensor', body)
      .subscribe(data => {
        console.log(data);
        const i: Array<any> = data['modular'][0]['device'];
        const length = i.length;
        for (let j = 0; j < length; j++) {
          const name = String(i[j]['dname']);
          const id = String(i[j]['did']);
          device.push({name, id});
        }
        this.SensorInit(device[0].id);
        this.Device = device;
      });

  }
  /*传感器初始化数据*/
  SensorInit(DId) {
    const sensor = [];
    const body = '{\n' +
      '\t\t"did":"' + DId + '"\n' +
      '}';
    this.httpSensor.post('http://120.78.137.182/element/SeeDeviceSensor', body)
      .subscribe(data => {
        console.log(data);
        const i: Array<any> = data['device'][0]['sensor'];
        const length = i.length;
        for (let j = 0; j < length; j++) {
          const name = String(i[j]['sname']);
          const id = String(i[j]['sid']);
          sensor.push({name, id});
        }
        this.MapChart(sensor[0].id, sensor[0].name);
        this.Sensor = sensor;
      });
  }

  MapChart(body: string, SensorName: string) {
    const bodyM = '{\n' +
      '\t"sid":"' + body + '"\n' +
      '}';
    console.log(bodyM);
    this.Datas = this.httpSensor.post('http://120.78.137.182/element/seesensordata', bodyM);
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
            left: 'center',
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
  query3Number(i) {
    this.ngOnInit();
  }

}
export class NameId {
  name: string|any;
  id: string|any;
}
