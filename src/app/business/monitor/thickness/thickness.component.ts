import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../routeAnimation';
import {HttpClient} from '@angular/common/http';
import {LoginIdService} from '../../../login/login-id.service';
import {MonitorHttpService} from '../monitor-http.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-thickness',
  templateUrl: './thickness.component.html',
  styleUrls: ['./thickness.component.css']
})
export class ThicknessComponent implements OnInit {
  option: Array<any>;
  options: Array<any> = [];
  updateOptions: any;
  private now: Date;
  private value: number ;
  private data: any[];
  private timer: any;

  constructor(private http: HttpClient, private user: LoginIdService, private httpMonitor: MonitorHttpService) {
    this.options = [];
    this.http.post('http://120.78.137.182/element/find/thickness/sensor', 'sysids=' +
      this.user.getObject('user').sysids).subscribe(data => {
      console.log(data);
      const length = data['values'].length;
      for (let i = 0; i < length; i++) {
        this.MapChart(data['values'][i]['sid'], data['values'][i]['sname'], this.toDatestart(new Date()), this.toDateend(new Date()));
      }
    });
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
  ngOnInit() {
  }
    // initialize chart options:
  MapChart(body: string, SensorName: string, starttime: string, deadline: string) {
    this.httpMonitor.findhstorysensordata({sid: body, starttime: starttime, deadline: deadline})
      .subscribe(d => {
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
          this.options.push({
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
          });
        } else if (d['status'] === '13') {
          console.log(d);
          console.log('id不存在');
        }
      });
  }
}

