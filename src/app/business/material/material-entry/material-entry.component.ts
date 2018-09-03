import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {ALJson, Aluminums, Paint, PaintJson} from '../Material';
import {Url} from '../../../getUrl';

@Component({
  selector: 'app-material-entry',
  templateUrl: './material-entry.component.html',
  styleUrls: ['./material-entry.component.css']
})
export class MaterialEntryComponent implements OnInit {

  url = new Url().getUrl();
  formName: FormGroup;
  modalProp: any;
  dataName: any;
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
  AlType = [
    ['type', 'number', 'number', 'number'],
    ['type', 'number', 'number', 'number'],
    [ 'type', '生产系统'],
  ];
  PtDataName = [
    ['采购单号', '总重量(千克)', '单价(元/千克)', '总价(元)'],
    ['油漆名称', '油漆固化物含量(%)', '油漆挥发份含量(%)', '油漆密度'],
    ['稀释剂名称', '稀释剂总重量(千克)', '稀释剂单价(元/千克)', '稀释剂总价(元)'],
    ['稀释剂类型', '稀释剂预计总重量(千克)', '稀释剂固化物含量(%)', '稀释剂挥发份含量(%)'],
    ['稀释剂产品编号', '油漆类型', '油漆厂家名称', '生产系统'],
  ];
  PtType = [
    ['type', 'number', 'number', 'number'],
    ['type', 'number', 'number', 'number'],
    ['type', 'number', 'number', 'number'],
    ['type', 'number', 'number', 'number'],
    ['type', 'type', 'type', 'pro_system'],
  ];
  dataType = [];
  PtModalProp = [
    ['purchase', 'paex_weight', 'price', 'pamount'],
    ['pname', 'pcondensate', 'pvolatile', 'pdensity'],
    ['dname', 'diex_weight', 'dprice', 'damount'],
    ['diluent_type', 'diluent_weight', 'condensate', 'dvolatile'],
    ['supnum', 'ptype', 'supname', 'pro_system'],
  ];
  PtName = ['分桶号', '分桶重量'];
  PtdName = ['分桶号', '分桶重量'];
  @Input() PtArr = [];
  PtProp = ['supid', 'paint_weight'];
  @Input() PtdArr = [];
  PtdProp = ['supnum', 'diluent_weight'];
  AlName = ['分卷号', '分卷重量'];
  AlProp = ['alweight', 'supid'];
  @Input() AlArr = [];
  @Input() btn: string;
  type = 0;
  AL: FormGroup;
  paint: FormGroup;
  alJson = new ALJson();
  paintJson = new PaintJson();
  pro_systemName: any;
  pro_system: string;
  @Input() tBody = [];
  @Output() getData = new EventEmitter();
  @Output() pass = new EventEmitter();
  constructor(private http: HttpClient, private fb: FormBuilder, private user: LoginIdService) {


    this.AL = this.fb.group({
      purchase: ['', [Validators.required]],
      alweight: ['', [Validators.required]],
      altype: ['', [Validators.required]],
      alwidth: ['', [Validators.required]],
      althickness: ['', [Validators.required]],
      aldensity: ['', [Validators.required]],
      alprice: ['', [Validators.required]],
      supname: ['', [Validators.required]],
      wid: ['', [Validators.required]],
      pro_system: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      auditor: ['', [Validators.required]]
    });
    this.paint = this.fb.group({
      pname: ['', Validators.required],
      purchase: ['', Validators.required],
      pdensity: ['', Validators.required],
      pcondensate: ['', Validators.required],
      ptype: ['', Validators.required],
      pvolatile: ['', Validators.required],
      price: ['', Validators.required],
      paex_weight: ['', Validators.required],
      diluent_id: ['', Validators.required],
      supname: ['', Validators.required],
      auditor: ['', Validators.required],
      supnum: ['', Validators.required],
      dname: ['', Validators.required],
      dtype: ['', Validators.required],
      condensate: ['', Validators.required],
      dvolatile: ['', Validators.required],
      dprice: ['', Validators.required],
      diluent_weight: ['', Validators.required],
      diex_weight: ['', Validators.required],
      pro_system: ['', Validators.required],
      pamount: ['', Validators.required],
      damount: ['', Validators.required],
      diluent_type: ['', Validators.required]
    });
    this.formName = this.AL;
    this.modalProp = this.AlModalProp;
    this.dataName = this.AlDataName;
    this.dataType = this.AlType;
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
  getModalData(index) {
    console.log(this.tBody[index]);
    console.log(this.AlArr);
    if (this.type === 0) {
      this.tBody[index]['pro_system'] = this.getProSystemName(this.tBody[index]['pro_system']);
      console.log(this.tBody[index]['pro_system'] = this.getProSystemName(this.tBody[index]['pro_system']));
      this.AL.patchValue(this.tBody[index]);
    } else {
      this.tBody[index]['pro_system'] = this.getProSystemName(this.tBody[index]['pro_system']);
      this.paint.patchValue(this.tBody[index]);
    }
  }
  toggleBtn(btnName) {
    console.log('btnName');
    this.type = btnName;
    if (this.type === 0) {
      this.formName = this.AL;
      this.modalProp = this.AlModalProp;
      this.dataName = this.AlDataName;
      this.PtArr = this.PtdArr = [];
      this.dataType = this.AlType;
    } else {
      this.formName = this.paint;
      this.modalProp = this.PtModalProp;
      this.dataName = this.PtDataName;
      this.dataType = this.PtType;
      this.AlArr = [];
    }
  }
  submit() {
    if (this.type === 0) {
      this.submitAL();
    } else if (this.type === 1) {
      this.submitPaint();
    }
  }
  submitAL(): void {
    this.alJson.purchase = this.AL.get('purchase').value;
    this.alJson.alweight = this.AL.get('alweight').value;
    this.alJson.altype = this.AL.get('altype').value;
    this.alJson.alwidth = this.AL.get('alwidth').value;
    this.alJson.althickness = this.AL.get('althickness').value;
    this.alJson.aldensity = this.AL.get('aldensity').value;
    this.alJson.alprice = this.AL.get('alprice').value;
    this.alJson.supname = this.AL.get('supname').value;
    this.alJson.auditor = this.user.getObject('user').realName;
    this.alJson.pro_system = this.getProSystemOid();
    this.alJson.arr = this.AlArr;
    console.log(this.alJson);
    this.http.post('http://' + this.url + '/element/Add-Aluminum', this.alJson)
      .subscribe(data => {
        console.log(data);
        this.getData.emit(this.type);
      });
  }
  submitPaint() {
    this.paintJson.purchase = this.paint.get('purchase').value;
    this.paintJson.pname = this.paint.get('pname').value;
    this.paintJson.pdensity = this.paint.get('pdensity').value;
    this.paintJson.pcondensate = this.paint.get('pcondensate').value;
    this.paintJson.ptype = this.paint.get('ptype').value;
    this.paintJson.pvolatile = this.paint.get('pvolatile').value;
    this.paintJson.price = this.paint.get('price').value;
    this.paintJson.paex_weight = this.paint.get('paex_weight').value;
    this.paintJson.supname = this.paint.get('supname').value;
    this.paintJson.auditor = this.user.getObject('user').realName;
    this.paintJson.dname = this.paint.get('dname').value;
    this.paintJson.dtype = this.paint.get('dtype').value;
    this.paintJson.dprice = this.paint.get('dprice').value;
    this.paintJson.condensate = this.paint.get('condensate').value;
    this.paintJson.dvolatile = this.paint.get('dvolatile').value;
    this.paintJson.diex_weight = this.paint.get('diex_weight').value;
    this.paintJson.diluent_weight = this.paint.get('diluent_weight').value;
    this.paintJson.pro_system = this.getProSystemOid();
    this.paintJson.arr1 = this.PtArr;
    this.paintJson.arr2 = this.PtdArr;
    console.log(this.paintJson);
    this.http.post('http://' + this.url + '/element/Add-Paint', this.paintJson)
      .subscribe(data => {
        console.log(data);
        this.getData.emit(this.type);
      });
  }
  addALArr() {
    this.AlArr.push({'supid': null, 'alweight': null});
  }
  addPtArr() {
    console.log('PtArr');
    this.PtArr.push({'paint_weight': null, 'supid': null});
  }
  addPtdArr() {
    console.log('PtdArr');
    this.PtdArr.push({'diluent_weight': null, 'supnum': null});
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
}

