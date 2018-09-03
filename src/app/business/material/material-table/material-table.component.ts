import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterialHttpService} from '../material-http.service';
import {LoginIdService} from '../../../login/login-id.service';
import {Aluminums, Paint} from '../Material';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit {

  modalProp: any;
  dataName: any;
  material: any;
  AlDataName = [
    ['采购单号', '总重量(千克)', '单价(元/千克)', '总价(元)'],
    ['铝板型号', '铝板宽度(毫米)', '铝卷厚度(微米)', '铝卷密度'],
    [ '厂家名称', '生产系统'],
  ];
  AlModalProp = [
    ['purchase', 'alweight', 'alprice', 'amount'],
    ['altype', 'alwidth', 'althickness', 'aldensity'],
    [ 'supname', 'pro_system'],
  ];
  PtDataName = [
    ['采购单号', '总重量(千克)', '单价(元/千克)', '总价(元)'],
    ['油漆名称', '油漆固化物含量(%)', '油漆挥发份含量(%)', '油漆密度'],
    ['稀释剂名称', '稀释剂总重量(千克)', '稀释剂单价(元/千克)', '稀释剂总价(元)'],
    ['稀释剂类型', '稀释剂预计总重量(千克)', '稀释剂固化物含量(%)', '稀释剂挥发份含量(%)'],
    ['稀释剂产品编号', '油漆类型', '油漆厂家名称', '生产系统'],
  ];
  PtModalProp = [
    ['purchase', 'paex_weight', 'price', 'pamount'],
    ['pname', 'pcondensate', 'pvolatile', 'pdensity'],
    ['dname', 'diex_weight', 'dprice', 'damount'],
    ['diluent_type', 'diluent_weight', 'condensate', 'dvolatile'],
    ['supnum', 'ptype', 'supname', 'pro_system'],
  ];
  PtName = ['分桶号', '分桶重量'];
  PtdName = ['分桶号', '分桶重量'];
  PtArr = [];
  PtProp = ['supid', 'paint_weight'];
  PtdArr = [];
  PtdProp = ['supnumber', 'diluentweight'];
  AlName = ['分卷号', '分卷重量'];
  AlProp = ['al_weight', 'supplier_number'];
  AlArr = [];
  @Input() tHead: Array<string>; // 表格头部列式信息
  @Input() fontSize: number; // 字体大小
  @Input() prop: Array<string>; // 类的成员信息排列
  @Input() tBody: Array<object>[]; // 表格主体数据
  @Input() title: string; // 表格标题
  @Input() btnGroup: Array<string> = []; // 按钮组
  @Input() url: string;
  @Input() status: number;
  @Input() page: PageService;
  @Output() getData = new EventEmitter();
  @Output() pass = new EventEmitter();
  @Input() btn: string;
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
      if (this.pro_system === this.pro_systemName[i]['name']) {
        return this.pro_systemName[i]['sid'];
      }
    }
  }
  getProSystemName(pro_systemSid) {
    console.log(pro_systemSid);
    for (let i = 0; i < this.pro_systemName.length; i++) {
      if (pro_systemSid === this.pro_systemName[i]['sid']) {
        console.log(pro_systemSid === this.pro_systemName[i]['sid']);
        return this.pro_systemName[i]['name'];
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
    this.tBody[index]['pro_system'] = this.getProSystemName(this.tBody[index]['pro_system']);
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
}
