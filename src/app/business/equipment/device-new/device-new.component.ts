import { Component, OnInit } from '@angular/core';
import {EquipmentHttpService} from '../../../remind/business/equipment-http.service';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.css']
})
export class DeviceNewComponent implements OnInit {

  constructor(private httpDevice: EquipmentHttpService) { }

  page = 1;
  DeviceInformation = [];
  ngOnInit() {
    this.httpDevice.FindDeviceInformation({ page: this.page, row: 10})
      .subscribe(data => {
        this.DeviceInformation = data['values'];
        console.log(this.DeviceInformation);
      });
  }

}
