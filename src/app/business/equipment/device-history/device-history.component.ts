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
  animations: [slideToRight]
})
export class DeviceHistoryComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  sid: string;
  option: any;
  Datas: Observable<any>;
  device: Array<Device>;
  modular: Array<Modular>;
  sensor: Array<Sensor>;
  height = '0';
  constructor(
    private user: LoginIdService, private activatedRoute: ActivatedRoute, private httpSensor: EquipmentHttpService,
    private httpAdmin: EquipmentHttpService, private httpDevice: EquipmentHttpService) {
    this.device = [];
    this.modular = [];
    this.sensor = [];
    this.height = window.innerHeight - 400 + 'px';
  }

  ngOnInit() {
    this.ModularInit();
  }
  /*模块初始化数据*/
  ModularInit(MId = 0, DId = 0) {
    this.httpAdmin.SeeSystemModular({sysids: this.user.getObject('user').sysids})
      .subscribe( data => {
        this.modular = data['values'][0]['modular'];
        console.log(this.modular);
        this.DeviceInit(this.modular[0].mid);
      });
  }
  /*设备初始化数据*/
  DeviceInit(Mid) {
    this.httpDevice.SeeModularDeviceSensor({mid: Mid})
      .subscribe(data => {
        console.log(data);
        this.device = data['values'][0]['device'];
        this.SensorInit(this.device[0].did);
      });

  }
  /*传感器初始化数据*/
  SensorInit(DId) {
    this.httpSensor.SeeDeviceSensor({did: DId})
      .subscribe(data => {
        console.log(data);
        this.sensor = data['values'][0]['sensor'];
        this.MapChart(this.sensor[0].sid, this.sensor[0].sname);
      });
  }

  MapChart(body: string, SensorName: string) {
    this.Datas = this.httpSensor.seesensordata({sid: body});
    this.Datas.subscribe(d => {
      if (d['status'] === '10') {
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
      } else if (d['status'] === '13') {
        console.log(d);
        console.log('id不存在');
      }
    });
  }

}
class Modular {
  mname: string;
  mid: string;
  fid: string;
  device: string;
  open: string;
}
class Device {
  current: 0;
  did: string;
  dinstalldate: string;
  dmodel: string;
  dname: string;
  dproDate: string;
  dstatus: string;
  dtype: string;
  dvender: string;
  factoryNumber: string;
  fid: string;
  open: string;
  power: string;
  sensor: string;
  usestatus: string;
  voltage: string;
}
class Sensor {
  initialvalue: string;
  open: string;
  pid: string;
  saddress: string;
  sdatatype: string;
  sensordata: string;
  sid: string;
  smax: string;
  sname: string;
  sstatus: string;
  stype: string;
}
