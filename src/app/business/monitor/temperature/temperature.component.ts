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
  SensorNewValue;
  SensorNewTime: A;
  SensorNewName: Array<any> = [];
  SensorDataTime: Array<any>[] = [];
  SensorDataValue: Array<any>[] = [];
  SensorDataName: Array<any>[] = [];
  option: Array<any> = [];
  options: Array<any> = [];
  constructor(private http: MonitorHttpService) {
    this.Temperature = this.http.FindTemperatureSensor();
    this.getSensorId();
  }

  ngOnInit() {
    setInterval(() => {this.getSensorId(); this.TemperatureMap(); console.log(2); }, 3000);
  }
  getSensorId() {
    this.Temperature.subscribe(data => {
      console.log(data);
      data = data['values'];
      const length = data.length;
      for (let i = 0; i < length; i++) {
        this.SensorId.push(data[i]['sid']);
        this.SensorNewValue = data[i]['sdata'];
        this.SensorNewTime = data[i]['stime'];
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
        });
    }
    this.SensorDataValue = SDValue;
    this.SensorDataTime = SDTime;
    this.SensorDataName = SDName;
  }
  TemperatureMap() {
    const option: Array<any> = [];
    let length = this.SensorDataValue.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if ()
      }
    }
    if (this.option.length === length) {
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
