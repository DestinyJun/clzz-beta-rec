import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageService} from '../../../based/page.service';
import {ActivatedRoute} from '@angular/router';
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
    ['采购单号', '总重量', '单价', '总价'],
    ['铝卷型号', '铝卷宽度', '铝卷厚度', '铝卷密度'],
    [ '厂家名称', '录入人员', '生产系统'],
  ];
  AlModalProp = [
    ['purchase', 'alexweight', 'alprice', 'amount'],
    ['altype', 'alwidth', 'althickness', 'aldensity'],
    [ 'supname', 'auditor', 'pro_system'],
  ];
  PtDataName = [
    ['采购单号', '总重量', '单价', '总价'],
    ['油漆名称', '油漆固化物含量', '油漆挥发份含量', '油漆密度'],
    ['稀释剂名称', '稀释剂总重量', '稀释剂单价', '稀释剂总价'],
    ['稀释剂类型', '稀释剂固化物含量', '稀释剂挥发份含量'],
    ['油漆类型', '厂家名称', '录入人员', '生产系统'],
  ];
  PtModalProp = [
    ['purchase', 'paex_weight', 'price', 'pamount'],
    ['pname', 'pcondensate', 'pvolatile', 'pdensity'],
    ['dname', 'diluentweight', 'diluent_price', 'damount'],
    ['diluent_type', 'condensate', 'dvolatile'],
    ['ptype', 'supname', 'auditor', 'pro_system'],
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
  type = 0;
  constructor(private activatedRoute: ActivatedRoute,
              private materialHttp: MaterialHttpService,
              private user: LoginIdService) {
    this.modalProp = this.AlModalProp;
    this.dataName = this.AlDataName;
    this.material = new Aluminums();
  }

  ngOnInit() {

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

  modalValue(index) {
    this.material = this.tBody[index];
    console.log(this.tBody[index]);
    if (this.type === 0) {
      this.materialHttp.SeeAluminum({purchase: this.tBody[index]['purchase']})
        .subscribe(data => {
          console.log(data);
          this.AlArr = data['data'][0]['arr'];
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
