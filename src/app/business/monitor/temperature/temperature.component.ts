import {Component, HostBinding, OnInit} from '@angular/core';
import {MonitorHttpService} from '../monitor-http.service';
import * as echarts from 'echarts';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  option: Array<any> = [];
  proSystem = this.user.getSysids();
  proSystemName: string;
  options: any;
  echartMap: any;
  interval: any;
  constructor(private http: MonitorHttpService, private user: LoginIdService) {
    this.proSystemName = this.proSystem[0]['sysName'];
    this.initSensor();
  }

  ngOnInit() {
    this.interval = setInterval(() => {this.initSensor(); console.log(10); }, 10000);
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.initSensor();
    }
  }
  initSensor() {
    for (let _i = 0; _i < this.proSystem.length; _i++) {
      if (this.proSystem[_i]['sysName'] === this.proSystemName) {
        this.http.FindTemperatureSensor({sysIds: this.proSystem[_i]['sysId']}).subscribe(data => {
          console.log(data);
          if (data['values'] !== null) {
            const length = data['values'].length;
            for (let i = 0; i < length; i++) {
              this.MapChart(i, data['values'][i]['sId'], data['values'][i]['sName'],
                this.user.toDatestart(new Date()), this.user.toDateend(new Date()));
            }
          }
        });
        break;
      }
    }
  }
  modalValue(index) {
    this.options = this.option[index];
    setTimeout(() => this.echartMap.resize(), 500);
    console.log(this.options);
  }
  initOptions(event) {
    console.log(event);
    this.echartMap = event;
  }
  MapChart(index: number, body: string, SensorName: string, starttime: string, deadline: string) {
    this.http.findhstorysensordata({sId: body, startTime: this.user.toDatestart(new Date()), deadline: this.user.toDateend(new Date())})
      .subscribe(d => {
        const dates = [];
        const data = [];
        console.log(d);
        if (d['values'] !== null) {
          const length = d['values'].length;
          for (let j = 0; j < length; j++) {
            const arr = d['values'][j]['sTime'].split(' ');
            dates.push(arr[1]);
            data.push(d['values'][j]['sData']);
          }
        } else {
          console.log(d);
          console.log('id不存在');
        }
        this.option[index] = ({
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
              color: '#fff',
              fontSize: 16
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
        });
      });
  }
}

