import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.css']
})
export class SensorComponent implements OnInit {
  Modular: Array<any> = [];
  ModularJson: any;
  ModularId = 'mod0001';
  DeviceSensorJson: any;
  DeviceSensor: Array<any> = [];
  NoDataSensorJson: any;
  option: any;
  Modularname: string;
  constructor(private activatedRoute: ActivatedRoute,
              private httpSensor: HttpClient,
              private httpAdmin: HttpClient,
              private httpDeviceSensor: HttpClient,
              private httpNoDataSensor: HttpClient) {}
  ngOnInit() {
    this.ModularInit();
    this.DeviceSensorInit(this.ModularId);
  }
  ModularIdInit(i) {
    this.DeviceSensorInit(i['mid']);
    this.ModularId = i['mid'];
    this.Modularname = i['mname'];
  }
  // 获取系统下模块
  ModularInit() {
    const body = '{\n' +
      '\t"sysid":"sys0001"\n' +
      '}';
    this.httpAdmin.post('http://120.78.137.182/element/SeeSystemModular', body)
      .subscribe( data => {
        console.log(data);
        data = data['system'][0]['modular'];
        this.ModularJson = data;
        console.log(this.ModularJson);
        const length = this.ModularJson.length;
        for (let i = 0; i < length; i++) {
          this.Modular.push(this.ModularJson[i]);
        }
      });
  }
// 获取模块下设备-传感器-最新值-id
  DeviceSensorInit(MId) {
    const body = '{\n' +
      '\t"mid":"' + MId + '"\n' +
      '}';
    console.log(body);
    this.httpDeviceSensor.post('http://120.78.137.182/element/find/devicename/sensorname/sensordata', body)
      .subscribe(data => {
        console.log(data);
        data = data['values'];
        this.DeviceSensorJson = data;
        this.NoDataSensorInit(MId);
      });
  }
// 增加无数据设备传感器
  NoDataSensorInit(MId) {
    const body = '{\n' +
      '\t"mid":"' + MId + '"\n' +
      '}';
    console.log(body);
    this.httpNoDataSensor.post('http://120.78.137.182/element/find/modular/device/sensor/name', body)
      .subscribe(data => {
        console.log(data);
        this.NoDataSensorJson = data['values'];
        console.log(this.NoDataSensorJson);
        console.log(this.DeviceSensorJson);
        const putData = [];
        const lengthNo = this.NoDataSensorJson.length;
        const length = this.DeviceSensorJson.length;
        if (length === 0) {
          for (let i = 0; i < lengthNo; i++) {
            putData.push({'Name': this.NoDataSensorJson[i], 'data': '---'});
          }
        } else {
          for (let i = 0; i < lengthNo; i++) {
            for (let j = 0; j < length; j++) {
              if (this.NoDataSensorJson[i]['sid'] === this.DeviceSensorJson[j]['sid']) {
                putData.push({'Name': this.NoDataSensorJson[i], 'data': this.DeviceSensorJson[j]['sdata']});
              } else if (j === length - 1) {
                putData.push({'Name': this.NoDataSensorJson[i], 'data': '---'});
              }
            }
          }
        }
        console.log(putData);
        const deviceSensor: Array<any> = [];
        let putlength = putData.length;
        if (putlength % 2 === 0) {
          for ( let i = 0; i < putlength; i += 2) {
            deviceSensor.push({'one': putData[i], 'two': putData[i + 1]});
          }
        } else {
          putlength = putlength - 1;
          for ( let i = 0; i < putlength; i += 2) {
            deviceSensor.push({'one': putData[i], 'two': putData[i + 1]});
          }
          deviceSensor.push({'one': putData[putlength], 'two': ''});
        }
        console.log(deviceSensor);
        this.DeviceSensor = deviceSensor;
        console.log(this.DeviceSensor);
      });
  }
}
