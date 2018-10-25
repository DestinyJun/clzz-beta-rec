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
  pro_systemName: any;
  pro_system: string;
  @Input() tBody = [];
  @Output() getData = new EventEmitter();
  @Output() pass = new EventEmitter();
  @Output() tips = new EventEmitter();
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
      pType: ['', Validators.required],
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
      this.tBody[index]['proSystem'] = this.getProSystemName(this.tBody[index]['proSystem']);
      this.tBody[index]['amount'] = this.tBody[index]['alPrice'] * this.tBody[index]['alWeight'];
      this.pro_system = this.tBody[index]['proSystem'];
      this.AL.patchValue(this.tBody[index]);
      //  this.AL.setValue({['amount']: this.tBody[index]['alPrice'] * this.tBody[index]['alWeight']});
    } else {
      this.tBody[index]['proSystem'] = this.getProSystemName(this.tBody[index]['proSystem']);
      this.pro_system = this.tBody[index]['proSystem'];
      this.paint.patchValue(this.tBody[index]);
    }
  }
  toggleBtn(btnName) {
    this.type = btnName;
    console.log(this.type);
    if (this.type === 0) {
      this.formName = this.AL;
      this.modalProp = this.AlModalProp;
      this.dataName = this.AlDataName;
      this.PtArr = this.PtdArr = [];
      this.dataType = this.AlType;
    } else {
      console.log(1);
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
  deleteAlArr(index) {
    for (let i = index + 1; i < this.AlArr.length; i++) {
      this.AlArr[i - 1] = this.AlArr[i];
    }
    this.AlArr.length--;
  }
  deletePtArr(index) {
    for (let i = index + 1; i < this.PtArr.length; i++) {
      this.PtArr[i - 1] = this.PtArr[i];
    }
    this.PtArr.length--;
  }
  deletePtdArr(index) {
    for (let i = index + 1; i < this.PtdArr.length; i++) {
      this.PtdArr[i - 1] = this.PtdArr[i];
    }
    this.PtdArr.length--;
  }
  submitAL(): void {
    const body = this.AL.value;
    body['auditor'] = this.user.getName();
    body['proSystem'] = this.getProSystemOid();
    body['arr'] = this.AlArr;
    console.log(body);
    this.http.post('http://' + this.url + '/element/Add-Aluminum', body)
      .subscribe(data => {
        console.log(data);
        this.getData.emit(this.type);
        if (data['status'] === '10') {
          this.tips.emit('铝卷录入成功! 10');
        } else {
          this.tips.emit('铝卷录入失败! 11');
        }
      });
  }
  submitPaint() {
    const body = this.paint.value;
    body['auditor'] = this.user.getObject('user').realName;
    body['proSystem'] = this.getProSystemOid();
    body['arr1'] = this.PtArr;
    body['arr2'] = this.PtdArr;
    console.log(body);
    this.http.post('http://' + this.url + '/element/Add-Paint', body)
      .subscribe(data => {
        console.log(data);
        this.getData.emit(this.type);
        if (data['status'] === '10') {
          this.tips.emit('油漆录入成功! 10');
        } else {
          this.tips.emit('油漆录入失败! 11');
        }
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

