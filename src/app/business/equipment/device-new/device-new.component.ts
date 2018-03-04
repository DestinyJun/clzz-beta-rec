import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.css']
})
export class DeviceNewComponent implements OnInit {

  constructor(private httpDevice: HttpClient) { }

  page = 1;
  DeviceInformation = [];
  ngOnInit() {
    const body = '\t{\n' +
      '\t"page":"' + this.page + '",\n' +
      '\t"row":"10"\n' +
      '}';
    this.httpDevice.post('http://120.78.137.182/element/find/device/information', body)
      .subscribe(data => {
        this.DeviceInformation = data['values'];
        console.log(this.DeviceInformation);
      });
  }

}
