import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MonitorHttpService} from '../monitor-http.service';
import * as echarts from 'echarts';
import {LoginIdService} from '../../../login/login-id.service';

@Component({
  selector: 'app-thickness',
  templateUrl: './thickness.component.html',
  styleUrls: ['./thickness.component.css']
})
export class ThicknessComponent implements OnInit {
  option: Array<any>;
  proSystem = this.user.getSysids();
  proSystemName: string;
  options: any;
  echartMap: any;
  constructor(private http: MonitorHttpService, private user: LoginIdService) {
    this.proSystemName = this.proSystem[0]['sysName'];
    this.initSensor();
  }

  ngOnInit() {
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.initSensor();
    }
  }
  initSensor() {
    this.option = [];
    for (let _i = 0; _i < this.proSystem.length; _i++) {
      if (this.proSystem[_i]['sysName'] === this.proSystemName) {
        this.http.FindThicknessSensor({sysIds: this.proSystem[_i]['sysId']}).subscribe(data => {
          console.log(data);
          if (data['values'] !== null) {
            const length = data['values'].length;
            for (let i = 0; i < length; i++) {
              this.MapChart(data['values'][i]['sId'], data['values'][i]['sName'], this.toDatestart(new Date()), this.toDateend(new Date()));
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

  MapChart(body: string, SensorName: string, starttime: string, deadline: string) {
    this.http.findhstorysensordata({sId: body, startTime: this.toDatestart(new Date()), deadline: this.toDateend(new Date())})
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
        this.option.push({
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
              fontSize: 14
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

