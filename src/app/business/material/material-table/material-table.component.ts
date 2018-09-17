import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterialHttpService} from '../material-http.service';
import {LoginIdService} from '../../../login/login-id.service';
import {
  AlDataName,
  AlModalProp,
  AlName,
  AlProp,
  Aluminums,
  Paint,
  PtDataName,
  PtdName,
  PtdProp,
  PtModalProp,
  PtName,
  PtProp
} from '../Material';
import {PageBetaService} from '../../../based/page-beta.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit {

  modalProp: any;
  dataName: any;
  material: any;
  AlDataName = AlDataName;
  AlModalProp = AlModalProp;
  PtDataName = PtDataName;
  PtModalProp = PtModalProp;
  PtName = PtName;
  PtdName = PtdName;
  PtArr = [];
  PtProp = PtProp;
  PtdArr = [];
  PtdProp = PtdProp;
  AlName = AlName;
  AlProp = AlProp;
  AlArr = [];
  @Input() tHead: Array<string>; // 表格头部列式信息
  @Input() fontSize: number; // 字体大小
  @Input() prop: Array<string>; // 类的成员信息排列
  @Input() tBody: Array<object>[]; // 表格主体数据
  @Input() title: string; // 表格标题
  @Input() btnGroup: Array<string> = []; // 按钮组
  @Input() url: string;
  @Input() status: number;
  @Input() page: PageBetaService;
  @Output() getData = new EventEmitter();
  @Output() pass = new EventEmitter();
  @Input() btn: string;
  proSystem = this.user.getSysids();
  @Output() sProSystem = new EventEmitter();
  type = 0;
  pro_systemName: any;
  pro_system: string;
  constructor(private activatedRoute: ActivatedRoute,
              private materialHttp: MaterialHttpService,
              private router: Router, private user: LoginIdService) {
    this.modalProp = this.AlModalProp;
    this.dataName = this.AlDataName;
    this.material = new Aluminums();
  }

  ngOnInit() {
    this.getProSystem();
  }
  getProSystem() {
    this.pro_systemName = this.user.getSysids();
    console.log(this.pro_systemName, this.user.getSysids());
  }
  getProSystemOid() {
    for (let i = 0; i < this.pro_systemName.length; i++) {
      if (this.pro_system === this.pro_systemName[i]['sysName']) {
        return this.pro_systemName[i]['sysId'];
      }
    }
  }
  getProSystemName(pro_systemSid) {
    console.log(pro_systemSid);
    for (let i = 0; i < this.pro_systemName.length; i++) {
      if (pro_systemSid === this.pro_systemName[i]['sysId']) {
        console.log(pro_systemSid === this.pro_systemName[i]['sysId']);
        return this.pro_systemName[i]['sysName'];
      }
    }
  }
  qrCode(purchase) {
    const url = '/qrcode/' + purchase + '/' + this.type + '/1/1/1/1/1';
    this.router.navigate([url]);
  }
  toggleBtn(btnName) {
    this.type = btnName;
    this.getData.emit(btnName);
    if (this.type === 0) {
      this.material = new Aluminums();
      this.modalProp = this.AlModalProp;
      this.dataName = this.AlDataName;
    } else {
      this.material = new Paint();
      this.modalProp = this.PtModalProp;
      this.dataName = this.PtDataName;
    }
  }
  readType() {
    if (this.type === 0) {
      return '铝板';
    } else if (this.type === 1) {
      return '油漆';
    }
  }
  havePass(status) {
    this.pass.emit(status);
  }
  modalValue(index) {
    this.tBody[index]['proSystem'] = this.getProSystemName(this.tBody[index]['proSystem']);
    this.material = this.tBody[index];
    console.log(this.tBody[index]);
    if (this.type === 0) {
      this.materialHttp.SeeAluminum({purchase: this.tBody[index]['purchase']})
        .subscribe(data => {
          console.log(data);
          this.AlArr = data['data'][0]['arr'];
          console.log(this.AlArr);
          this.PtArr = this.PtdArr = [];
        });
    } else {
      this.materialHttp.SeePaint({purchase: this.tBody[index]['purchase']})
        .subscribe(data => {
          console.log(data);
          this.PtArr = data['data1'][0]['arr1'];
          this.PtdArr = data['data2'][0]['arr2'];
          this.AlArr = [];
        });
    }
  }
  selectSystem(name) {
    this.sProSystem.emit(name);
  }
}
