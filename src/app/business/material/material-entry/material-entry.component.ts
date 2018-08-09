import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {PageService} from '../../../based/page.service';
import {ALJson, Aluminums, Paint, PaintJson} from '../Material';

@Component({
  selector: 'app-material-entry',
  templateUrl: './material-entry.component.html',
  styleUrls: ['./material-entry.component.css']
})
export class MaterialEntryComponent implements OnInit {

  formName: FormGroup;
  modalProp: any;
  dataName: any;
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
  @Input() PtArr = [];
  PtProp = ['supid', 'paint_weight'];
  @Input() PtdArr = [];
  PtdProp = ['supnumber', 'diluentweight'];
  AlName = ['分卷号', '分卷重量'];
  AlProp = ['al_weight', 'supplier_number'];
  @Input() AlArr = [];
  @Input() btn: string;
  type = 0;
  AL: FormGroup;
  paint: FormGroup;
  alJson = new ALJson();
  paintJson = new PaintJson();
  @Input() tBody = [];
  @Output() getData = new EventEmitter();
  constructor(private http: HttpClient, private fb: FormBuilder, private user: LoginIdService) {


    this.AL = this.fb.group({
      purchase: ['', [Validators.required]],
      alexweight: ['', [Validators.required]],
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
      wid: ['', Validators.required],
      auditor: ['', Validators.required],
      dname: ['', Validators.required],
      dtype: ['', Validators.required],
      condensate: ['', Validators.required],
      dvolatile: ['', Validators.required],
      diluent_price: ['', Validators.required],
      diluentweight: ['', Validators.required],
      pro_system: ['', Validators.required],
      pamount: ['', Validators.required],
      damount: ['', Validators.required],
      diluent_type: ['', Validators.required]
    });
    this.formName = this.AL;
    this.modalProp = this.AlModalProp;
    this.dataName = this.AlDataName;
  }

  ngOnInit() {}
  getModalData(index) {
    console.log(this.tBody[index]);
    console.log(this.AlArr);
    if (this.type === 0) {
      this.AL.patchValue(this.tBody[index]);
    } else {
      this.paint.patchValue(this.tBody[index]);
    }
  }
  toggleBtn(btnName) {
    this.type = btnName;
    if (this.type === 0) {
      this.formName = this.AL;
      this.modalProp = this.AlModalProp;
      this.dataName = this.AlDataName;
      this.PtArr = this.PtdArr = [];
    } else {
      this.formName = this.paint;
      this.modalProp = this.PtModalProp;
      this.dataName = this.PtDataName;
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
    this.alJson.alexweight = this.AL.get('alexweight').value;
    this.alJson.altype = this.AL.get('altype').value;
    this.alJson.alwidth = this.AL.get('alwidth').value;
    this.alJson.althickness = this.AL.get('althickness').value;
    this.alJson.aldensity = this.AL.get('aldensity').value;
    this.alJson.alprice = this.AL.get('alprice').value;
    this.alJson.supname = this.AL.get('supname').value;
    this.alJson.wid = this.AL.get('wid').value;
    this.alJson.auditor = this.user.getObject('user').realName;
    this.alJson.pro_system = this.AL.get('pro_system').value;
    this.alJson.arr = this.AlArr;
    this.http.post('http://120.78.137.182/element/Add-Aluminum', this.alJson)
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
    this.paintJson.wid = this.paint.get('wid').value;
    this.paintJson.auditor = this.user.getObject('user').realName;
    this.paintJson.dname = this.paint.get('dname').value;
    this.paintJson.dtype = this.paint.get('dtype').value;
    this.paintJson.condensate = this.paint.get('condensate').value;
    this.paintJson.dvolatile = this.paint.get('dvolatile').value;
    this.paintJson.dprice = this.paint.get('dprice').value;
    this.paintJson.diex_weight = this.paint.get('diex_weight').value;
    this.paintJson.pro_system = this.paint.get('pro_system').value;
    this.paintJson.arr1 = this.PtArr;
    this.paintJson.arr2 = this.PtdArr;
    console.log(this.paintJson);
    this.http.post('http://120.78.137.182/element/Add-Paint', this.paintJson)
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
    this.PtdArr.push({'diluent_weight': null, 'supnum': null});
  }
}

