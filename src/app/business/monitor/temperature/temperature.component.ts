import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MonitorHttpService} from '../../../remind/business/monitor-http.service';
import {slideToRight} from '../../../remind/ts/routeAnimation';
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
  options: Array<any> = [];
  Count: number;
  constructor(private http: MonitorHttpService) {
    this.Temperature = this.http.FindTemperatureSensor();
    this.getSensorId();
  }

  ngOnInit() {
    this.TemperatureMap();

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
      this.http.seesensordata({sid : this.SensorId[i]})
        .subscribe(data => {
          console.log(data);
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
          k++;
          if (k === this.Count) {
            this.SensorDataValue = SDValue;
            this.SensorDataTime = SDTime;
            this.SensorDataName = SDName;
            this.TemperatureMap();
          }
        });
    }
  }
  TemperatureMap() {
    const option: Array<any> = [];
    let length = this.SensorDataValue.length;
    console.log(length);
    for (let i = 0; i < length; i++) {
      option[i] = {
        // Make gradient line here
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 0,
          min: 0,
          max: this.SensorDataValue[i].length - 1
        }],
        title: [{
          left: 'center',
          text: this.SensorDataName[i],
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
            data: this.SensorDataTime[i]
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
          data: this.SensorDataValue[i]
        }]
      };
    }
    if (this.option.length === length) {
      console.log(length);
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (this.option[i].title.text === option[j].title.text) {
            this.option[i] = option[j];
            break;
          }
        }
      }
    } else {
      this.option = option;
      console.log(this.option.length);
    }
    if (length % 2 === 0) {
      for (let i = 0; i < length; i += 2) {
        this.options[i / 2] = ({'one': this.option[i], 'two': this.option[i + 1]});
      }
    } else {
      length -= 1;
      for (let i = 0; i < length; i += 2) {
        this.options[i / 2] = ({'one': this.option[i], 'two': this.option[i + 1]});
      }
      this.options[length / 2 - 1] = ({'one': this.option[length], 'two': ''});
    }
  }
}
