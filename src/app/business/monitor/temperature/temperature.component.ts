import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MonitorHttpService} from '../../../remind/business/monitor-http.service';
@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent implements OnInit {
  Temperature: Observable<any>;
  SensorId: Array<any> = [];
  SensorDataTime: Array<any>[] = [];
  SensorDataValue: Array<any>[] = [];
  SensorDataName: Array<any>[] = [];
  option: Array<any> = [];
  options: Array<any> = [];
  constructor(private http: MonitorHttpService) {
    this.Temperature = this.http.FindTemperatureSensor();
    setTimeout(() => {this.TemperatureMap(); }, 500);
    this.getSensorId();
  }

  ngOnInit() {
    setInterval(() => {this.getSensorId(); this.TemperatureMap(); }, 3000);
  }
  getSensorId() {
    this.Temperature.subscribe(data => {
      data = data['values'];
      const length = data.length;
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
    for (let i = 0; i < length; i++) {
      this.http.seesensordata({sid : this.SensorId[i]})
        .subscribe(data => {
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
        });
    }
    this.SensorDataValue = SDValue;
    this.SensorDataTime = SDTime;
    this.SensorDataName = SDName;
  }
  TemperatureMap() {

    let length = this.SensorDataValue.length;
    for (let i = 0; i < length; i++) {
      this.option[i] = {
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
    if (length % 2 === 0) {
      for (let i = 0; i < length; i += 2) {
        this.options.push({'one': this.option[i], 'two': this.option[i + 1]});
      }
    } else {
      length -= 1;
      for (let i = 0; i < length; i += 2) {
        this.options.push({'one': this.option[i], 'two': this.option[i + 1]});
      }
      this.options.push({'one': this.option[length], 'two': ''});
    }
  }
}
