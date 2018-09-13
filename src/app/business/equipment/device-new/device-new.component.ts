import {Component, HostBinding, OnInit} from '@angular/core';
import {EquipmentHttpService} from '../equipment-http.service';
import {LoginIdService} from '../../../login/login-id.service';
import {PageBetaService} from '../../../based/page-beta.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-device-new',
  templateUrl: './device-new.component.html',
  styleUrls: ['./device-new.component.css'],
})
export class DeviceNewComponent implements OnInit {
  deviceInfo: Array<DeviceInfo> = [];
  proSystem = [];
  proSystemName: string;
  prop: Array<string> = ['dName', 'dModel', 'dvender', 'dInstallDate', 'life', 'dType', 'useStatus'];
  tHead: Array<string> = ['#', '设备名称', '铭牌', '生产厂家', '安装时间', '有效使用时长', '设备类型', '使用情况'];
  constructor(private httpDevice: EquipmentHttpService, private activatedRoute: ActivatedRoute,
              private user: LoginIdService, public page: PageBetaService) {
    this.proSystem = this.user.getSysids();
    this.page.setUrl('/home/equipment/devnew');
    console.log(this.proSystem);
    this.proSystemName = this.proSystem[0]['sysName'];
    this.activatedRoute.params.subscribe(() => {
      this.page.setPageNo(this.activatedRoute.snapshot.params['page']);
      this.initDevice();
    });
  }
  ngOnInit() {

  }
  initDevice() {
    this.deviceInfo = [];
    for (let i = 0; i < this.proSystem.length; i++) {
      if (this.proSystem[i]['sysName'] === this.proSystemName) {
        this.httpDevice.FindDeviceInformation({ page: this.page.getPageNo(), row: 15, sysIds: this.proSystem[i]['sysId']})
          .subscribe(data => {
            console.log(data);
            if (data['values'] !== null) {
              this.deviceInfo = data['values']['contents'];
              this.page.setTotalPage(data['values']['totalPage']);
            }
          });
      }
    }
  }
  selectSystem(name) {
    if (name !== this.proSystemName) {
      this.proSystemName = name;
      this.initDevice();
    }
  }

}
class DeviceInfo {
  dName: string;
  dModel: string;
  dvender: string;
  dInstallDate: string;
  life: string;
  dType: string;
  useStatus: string;
}
