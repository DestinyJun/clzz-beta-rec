import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {AlDataName, ALJson, AlModalProp, AlType, PtDataName, PtType, PtModalProp, PtName,
  Aluminums, Paint, PaintJson, PtdName, PtProp, PtdProp, AlName, AlProp} from '../Material';
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
  AlDataName = AlDataName;
  AlModalProp = AlModalProp;
  AlType = AlType;
  PtDataName = PtDataName;
  PtType = PtType;
  dataType = [];
  PtModalProp = PtModalProp;
  PtName = PtName;
  PtdName = PtdName;
  @Input() PtArr = [];
  PtProp = PtProp;
  @Input() PtdArr = [];
  PtdProp = PtdProp;
  AlName = AlName;
  AlProp = AlProp;
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
      alExpectWeight: ['', [Validators.required]],
      alType: ['', [Validators.required]],
      alWidth: ['', [Validators.required]],
      alThickness: ['', [Validators.required]],
      alDensity: ['', [Validators.required]],
      alPrice: ['', [Validators.required]],
      supName: ['', [Validators.required]],
      wId: ['', [Validators.required]],
      proSystem: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      auditor: ['', [Validators.required]]
    });
    this.paint = this.fb.group({
      pName: ['', Validators.required],
      purchase: ['', Validators.required],
      pDensity: ['', Validators.required],
      pCondensate: ['', Validators.required],
      ptype: ['', Validators.required],
      pVolatile: ['', Validators.required],
      price: ['', Validators.required],
      paExpectWeight: ['', Validators.required],
      diluentId: ['', Validators.required],
      supName: ['', Validators.required],
      auditor: ['', Validators.required],
      supNum: ['', Validators.required],
      dName: ['', Validators.required],
      dType: ['', Validators.required],
      condensate: ['', Validators.required],
      dVolatile: ['', Validators.required],
      dPrice: ['', Validators.required],
      diExpectWeight: ['', Validators.required],
      proSystem: ['', Validators.required],
      pamount: [''],
      damount: [''],
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
    this.alJson.alExpectWeight = this.AL.get('alExpectWeight').value;
    this.alJson.alType = this.AL.get('alType').value;
    this.alJson.alWidth = this.AL.get('alWidth').value;
    this.alJson.alThickness = this.AL.get('alThickness').value;
    this.alJson.alDensity = this.AL.get('alDensity').value;
    this.alJson.alPrice = this.AL.get('alPrice').value;
    this.alJson.supName = this.AL.get('supName').value;
    this.alJson.auditor = this.user.getObject('user').realName;
    this.alJson.proSystem = this.getProSystemOid();
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
    this.paintJson.pName = this.paint.get('pName').value;
    this.paintJson.pDensity = this.paint.get('pDensity').value;
    this.paintJson.pCondensate = this.paint.get('pCondensate').value;
    this.paintJson.ptype = this.paint.get('ptype').value;
    this.paintJson.pVolatile = this.paint.get('pVolatile').value;
    this.paintJson.price = this.paint.get('price').value;
    this.paintJson.paExpectWeight = this.paint.get('paExpectWeight').value;
    this.paintJson.supName = this.paint.get('supName').value;
    this.paintJson.auditor = this.user.getObject('user').realName;
    this.paintJson.dName = this.paint.get('dName').value;
    this.paintJson.dType = this.paint.get('dType').value;
    this.paintJson.dPrice = this.paint.get('dPrice').value;
    this.paintJson.condensate = this.paint.get('condensate').value;
    this.paintJson.dVolatile = this.paint.get('dVolatile').value;
    this.paintJson.diExpectWeight = this.paint.get('diExpectWeight').value;
    this.paintJson.proSystem = this.getProSystemOid();
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
    this.AlArr.push({'supId': null, 'alWeight': null});
  }
  addPtArr() {
    console.log('PtArr');
    this.PtArr.push({'paintWeight': null, 'supId': null});
  }
  addPtdArr() {
    console.log('PtdArr');
    this.PtdArr.push({'supNum': null, 'diluentWeight': null});
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

