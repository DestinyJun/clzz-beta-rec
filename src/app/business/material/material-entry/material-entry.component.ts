import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {AlDataName, ALJson, AlModalProp, AlType, PtDataName, PtType, PtModalProp, PtName,
  Aluminums, Paint, PaintJson, PtdName, PtProp, PtdProp, AlName, AlProp} from '../Material';
import {Url} from '../../../getUrl';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-material-entry',
  templateUrl: './material-entry.component.html',
  styleUrls: ['./material-entry.component.css']
})
export class MaterialEntryComponent implements OnInit {
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  url = new Url().getUrl();
  formName = 'AL';
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
  alType: string;
  alTypes = [];
  dType: string;
  dTypes = [];
  pType: string;
  pTypes = [];
  diluentPurpose: string;
  paintColor: string;
  paintPurpose: string;
  diluentPurposeS = [];
  paintColorS = [];
  paintPurposeS = [];
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
      supName: ['', [Validators.required]],
      proSystem: ['', [Validators.required]],
      username: [''],
      auditor: ['', [Validators.required]]
    });
    this.paint = this.fb.group({
      purchase: ['', Validators.required],
      pType: ['', Validators.required],
      paExpectWeight: ['', Validators.required],
      supName: ['', Validators.required],
      paintColor: ['', Validators.required],
      auditor: [''],
      diluentPurpose: [''],
      paintPurpose: [''],
      dType: ['', Validators.required],
      diExpectWeight: ['', Validators.required],
      username: [''],
      proSystem: ['', Validators.required],
    });
    this.formName = 'AL';
  }

  ngOnInit() {
    this.normsPurpose().subscribe(data => {
      console.log(data);
      this.diluentPurposeS = this.paintPurposeS = data['values'];
      this.paintPurpose = this.diluentPurpose = this.paintPurposeS[0];
    });
    this.alloyState().subscribe(data => {
      this.alTypes = data['values'];
      this.alType = this.alTypes[0];
    });
    this.normsType().subscribe(data => {
      console.log(data);
      this.pTypes = this.dTypes = data['values'];
      this.pType = this.dType = data['values'][0];
    });
    this.getProSystem();
  }
  getProSystem() {
    this.pro_systemName = this.user.getSysids();
    this.pro_system = this.pro_systemName[0]['sysName'];
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
      this.formName = 'AL';
      this.modalProp = this.AlModalProp;
      this.dataName = this.AlDataName;
      this.PtArr = this.PtdArr = [];
      this.dataType = this.AlType;
    } else {
      console.log(1);
      this.formName = 'paint';
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
      this.AlArr[i]['supId']--;
      this.AlArr[i - 1] = this.AlArr[i];
    }
    this.AlArr.length--;
  }
  deletePtArr(index) {
    for (let i = index + 1; i < this.PtArr.length; i++) {
      this.PtArr[i]['supId']--;
      this.PtArr[i - 1] = this.PtArr[i];
    }
    this.PtArr.length--;
  }
  deletePtdArr(index) {
    for (let i = index + 1; i < this.PtdArr.length; i++) {
      this.PtdArr[i]['supNum']--;
      this.PtdArr[i - 1] = this.PtdArr[i];
    }
    this.PtdArr.length--;
  }
  submitAL(): void {
    const body = this.AL.value;
    body['auditor'] = this.user.getName();
    body['proSystem'] = this.getProSystemOid();
    body['alType'] = this.alType;
    body['arr'] = this.AlArr;
    body['username'] = this.user.getName();
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
    body['dType'] = this.dType;
    body['pType'] = this.pType;
    body['diluentPurpose'] = this.diluentPurpose;
    body['paintPurpose'] = this.paintPurpose;
    body['username'] = this.user.getName();
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
    this.AlArr.push({'supId': this.AlArr.length + 1, 'alWeight': null});
  }
  addPtArr() {
    console.log('PtArr');
    this.PtArr.push({'paintWeight': null, 'supId': this.PtArr.length + 1});
  }
  addPtdArr() {
    console.log('PtdArr');
    this.PtdArr.push({'supNum': this.PtdArr.length + 1, 'diluentWeight': null});
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

  public normsPurpose(): Observable<any> {
    return this.http.post('http://' + this.url + '/element/nomrsPurpose', ' ', {
      headers: this.headers
    });
  }
  public normsType(): Observable<any> {
    return this.http.post('http://' + this.url + '/element/normsType', ' ', {
      headers: this.headers
    });
  }
  public alloyState(): Observable<any> {
    return this.http.post('http://' + this.url + '/element/alloyState', ' ', {
      headers: this.headers
    });
  }
}

