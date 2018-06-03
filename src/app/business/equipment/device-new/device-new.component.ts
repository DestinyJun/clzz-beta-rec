import {Component, HostBinding, OnInit} from '@angular/core';
import {EquipmentHttpService} from '../../../remind/business/equipment-http.service';
import {slideToRight} from '../../../remind/ts/routeAnimation';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.css'],
  animations: [slideToRight]
})
export class DeviceNewComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  constructor(private httpDevice: EquipmentHttpService) { }

  page = 1;
  DeviceInformation = [];
  ngOnInit() {
    this.httpDevice.FindDeviceInformation({ page: this.page, row: 10})
      .subscribe(data => {
        this.DeviceInformation = data['values'];
      });
  }

}
