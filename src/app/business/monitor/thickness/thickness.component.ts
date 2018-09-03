import {Component, HostBinding, OnInit} from '@angular/core';
import {slideToRight} from '../../../routeAnimation';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginIdService} from '../../../login/login-id.service';
import {MonitorHttpService} from '../monitor-http.service';
import * as echarts from 'echarts';
import {Url} from '../../../getUrl';

@Component({
  selector: 'app-thickness',
  templateUrl: './thickness.component.html',
  styleUrls: ['./thickness.component.css']
})
export class ThicknessComponent implements OnInit {
  url = new Url().getUrl();
  option: Array<any>;
  options: Array<any> = [];
  updateOptions: any;
  private now: Date;
  private value: number ;
  private data: any[];
  private timer: any;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  constructor(private http: HttpClient, private user: LoginIdService, private httpMonitor: MonitorHttpService) {
    this.options = [];
    this.http.post('http://' + this.url + '/element/find/thickness/sensor', 'sysids=' +
      this.user.getObject('user').sysids, {headers: this.headers}).subscribe(data => {
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
  MapChart(sid: string, SensorName: string, starttime: string, deadline: string) {
    this.httpMonitor.findhstorysensordata({sid: sid, starttime: this.toDatestart(new Date()), deadline: this.toDateend(new Date())})
      .subscribe(d => {
        if (d['status'] === '10') {
          console.log(d);
          const length = d['values'].length;
          const dates = [];
          const data = [];
          const DLength = d['values'].length;
          for (let j = 0; j < DLength; j++) {
            const arr = d['values'][j]['stime'].split(' ');
            dates.push(arr[1]);
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
          });
        } else if (d['status'] === '13') {
          console.log(d);
          console.log('id不存在');
        }
      });
  }
}

