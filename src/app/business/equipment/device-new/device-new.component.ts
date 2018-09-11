import {Component, HostBinding, OnInit} from '@angular/core';
import {EquipmentHttpService} from '../equipment-http.service';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.css'],
})
export class DeviceNewComponent implements OnInit {
  deviceInfo: Array<DeviceInfo> = [];
  prop: Array<string> = ['dName', 'dModel', 'dvender', 'dInstallDate', 'life', 'dType', 'useStatus'];
  tHead: Array<string> = ['#', '设备名称', '铭牌', '生产厂家', '安装时间', '有效使用时长', '设备类型', '使用情况'];
  constructor(private httpDevice: EquipmentHttpService) { }
  ngOnInit() {
    this.httpDevice.FindDeviceInformation({ page: 1, row: 15})
      .subscribe(data => {
        console.log(data);
        this.deviceInfo = data['values'];
      });
  }

}
class DeviceInfo {
  dname: string;
  dmodel: string;
  dvender: string;
  dinstalldate: string;
  life: string;
  dtype: string;
  usestatus: string;
}
