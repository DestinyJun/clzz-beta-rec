import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MonitorHttpService} from '../monitor-http.service';
import {slideToRight} from '../../../routeAnimation';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
  animations: [slideToRight]
})
export class TemperatureComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  Temperature: Observable<any>;
  SensorId: Array<any> = [];
  SensorDataTime: Array<any>[] = [];
  SensorDataValue: Array<any>[] = [];
  SensorDataName: Array<any>[] = [];
  option: Array<any> = [];
  options: Array<Options> = [];
  Count: number;
  tips: string;
  constructor(private http: MonitorHttpService) {
    this.Temperature = this.http.FindTemperatureSensor();
    this.getSensorId();
  }

  ngOnInit() {

  }
  getSensorId() {
    this.Temperature.subscribe(data => {
      console.log(data);
      data = data['values'];
      const length = data.length;
      this.Count = length;
      for (let i = 0; i < length; i++) {
        this.SensorId.push(data[i]['sid']);
      }
      this.getTemperatureData();
    });
  }
  getTemperatureData() {
    const length = this.SensorId.length;
    const SDTime = [];
    const SDValue = [];
    const SDName = [];
    let k = 0;
    for (let i = 0; i < length; i++) {
      this.http.findhstorysensordata({
        sid : this.SensorId[i],
        starttime: this.toDatestart(new Date()),
        deadline: this.toDateend(new Date())})
        .subscribe(data => {
          console.log(data);
          if (data['status'] === '10') {
            if (data['values'].length > 0) {
              const SDtime = [];
              const SDvalue = [];
              const DLength = data['values'].length;
              for (let j = 0; j < DLength; j++) {
                SDtime.push(data['values'][j]['stime']);
                SDvalue.push(data['values'][j]['sdata']);
              }
              SDName.push(data['values'][0]['sname']);
              SDTime.push(SDtime);
              SDValue.push(SDvalue);
              this.SensorDataValue[i] = SDValue;
              this.SensorDataTime[i] = SDTime;
              this.SensorDataName[i] = SDName;
              this.TemperatureMap(i);
            } else {
              k++;
              this.SensorDataValue[i] = [];
              this.SensorDataTime[i] = [];
              this.SensorDataName[i] = [];
              this.TemperatureMap(i);
            }
            if (this.Count === k) {
              this.tips = '此时间段没有数据';
            }
          } else if (k === this.Count) {
            this.tips = '服务器异常';
          }
        });
    }
  }
  toDatestart(time) {
    return time.getFullYear() + '-' + time.getDate() + '-' + time.getDay()
      + ' ' + (time.getHours() - 1) + ':' + time.getMinutes() + ':' + time.getSeconds();
  }
  toDateend(time) {
    return time.getFullYear() + '-' + time.getDate() + '-' + time.getDay()
      + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
  }
  TemperatureMap(index) {
    console.log(length);
    if (this.SensorDataValue[index].length > 0) {
      this.option.push( {
        // Make gradient line here
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: this.SensorDataValue[index].length - 1
        }],
        title: [{
          left: 'center',
          text: this.SensorDataName[index],
          textStyle: {
            color: '#fff'
          }
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          { axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            data: this.SensorDataTime[index]
          }],
        yAxis: [{
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {show: false}
        }],
        grid: [{
          bottom: '10%',
          height: '80%'
        }],
        series: [{
          type: 'line',
          areaStyle: {normal: {}},
          data: this.SensorDataValue[index]
        }]
      });
    }
  }
}
class Options {
  one: any;
  two: any;
}
