import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import * as echarts from 'echarts';
import {EquipmentHttpService} from '../../../remind/business/equipment-http.service';

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
    private httpSensor: EquipmentHttpService,
    private httpAdmin: EquipmentHttpService,
    private httpDevice: EquipmentHttpService) {}

  ngOnInit() {
    this.ModularInit();
  }
  /*模块初始化数据*/
  ModularInit(MId = 0, DId = 0) {
    const modular = [];
    this.httpAdmin.SeeAdministration()
      .subscribe( data => {
        console.log(data);
        const system: Array<object> = data['system'];
        for (let i = 0; i < system.length; i++) {
          for ( const pro in system[i]) {
            if (pro === 'modular') {
              const m: Array<object> = system[i]['modular'];
              for (let j = 0; j < m.length; j++) {
                const name = String(m[j]['mname']);
                const id = String(m[j]['mid']);
                modular.push({name, id});
              }
              console.log(modular);
              this.DeviceInit(modular[MId].id);
              this.Modular = modular;
            }
          }
        }
      });
  }
  /*设备初始化数据*/
  DeviceInit(Mid) {
    const device = [];
    this.httpDevice.SeeModularDeviceSensor({mid: Mid})
      .subscribe(data => {
        console.log(data);
        const d: Array<object> = data['values'][0]['device'];
            const length = d.length;
            for (let j = 0; j < length; j++) {
              const name = String(d[j]['dname']);
              const id = String(d[j]['did']);
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
    this.httpSensor.SeeDeviceSensor({did: DId})
      .subscribe(data => {
        console.log(data);
        const i: Array<any> = data['values'][0]['sensor'];
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
    this.Datas = this.httpSensor.seesensordata({sid: body});
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
  query3Number(i) {
    this.ngOnInit();
  }

}
export class NameId {
  name: string|any;
  id: string|any;
}
