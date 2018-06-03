import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {LoginIdService} from '../../../remind/login-id.service';
import {slideToRight} from '../../../remind/ts/routeAnimation';

@Component({
  selector: 'app-material-entry',
  templateUrl: './material-entry.component.html',
  styleUrls: ['./material-entry.component.css']
})
export class MaterialEntryComponent implements OnInit {
  @Output() subAL = new EventEmitter();
  public hid = false;
  public AL: FormGroup;
  public paint: FormGroup;
  public supid: Array<string> = [];
  public Alweight: Array<number> = [];
  public psupid: Array<string> = [];
  public paint_weight: Array<number> = [];
  public supnum: Array<string> = [];
  public diluent_weight: Array<number> = [];
  public As: Array<string> = [];
  public Asd: Array<string> = [];
  public Asp: Array<string> = [];
  private alJson = new ALJson();
  private paintJson = new PaintJson();
  constructor(private http: HttpClient, private fb: FormBuilder, private user: LoginIdService) {

    this.AL = this.fb.group({
      purchase: ['', [Validators.required]],
      Alexweight: ['', [Validators.required]],
      Altype: ['', [Validators.required]],
      Alwidth: ['', [Validators.required]],
      Althickness: ['', [Validators.required]],
      Aldensity: ['', [Validators.required]],
      Alprice: ['', [Validators.required]],
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
      dprice: ['', Validators.required],
      diex_weight: ['', Validators.required],
      pro_system: ['', Validators.required],
      pamount: ['', Validators.required],
      damount: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  public submitAL(): void {
    this.alJson.purchase = this.AL.get('purchase').value;
    this.alJson.Alexweight = this.AL.get('Alexweight').value;
    this.alJson.Altype = this.AL.get('Altype').value;
    this.alJson.Alwidth = this.AL.get('Alwidth').value;
    this.alJson.Althickness = this.AL.get('Althickness').value;
    this.alJson.Aldensity = this.AL.get('Aldensity').value;
    this.alJson.Alprice = this.AL.get('Alprice').value;
    this.alJson.supname = this.AL.get('supname').value;
    this.alJson.wid = this.AL.get('wid').value;
    this.alJson.auditor = this.user.get('userName');
    this.alJson.pro_system = this.AL.get('pro_system').value;
    for (let i = 0; i < this.As.length; i++) {
      this.alJson.arr.push({supid: this.supid[i], Alweight: this.Alweight[i]});
    }
    console.log(this.alJson);
    this.http.post('http://120.78.137.182/element/Add-Aluminum', this.alJson)
      .subscribe(data => {
        this.subAL.emit();
      });
  }
  public submitPaint() {
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
    this.paintJson.auditor = this.user.get('userName');
    this.paintJson.dname = this.paint.get('dname').value;
    this.paintJson.dtype = this.paint.get('dtype').value;
    this.paintJson.condensate = this.paint.get('condensate').value;
    this.paintJson.dvolatile = this.paint.get('dvolatile').value;
    this.paintJson.dprice = this.paint.get('dprice').value;
    this.paintJson.diex_weight = this.paint.get('diex_weight').value;
    this.paintJson.pro_system = this.paint.get('pro_system').value;
    for ( let i = 0; i < this.Asp.length; i++) {
      this.paintJson.arr1.push({supid: this.psupid[i], paint_weight: this.paint_weight[i]});
    }
    for ( let i = 0; i < this.Asd.length; i++) {
      this.paintJson.arr2.push({supnum: this.supnum[i], diluent_weight: this.diluent_weight[i]});
    }
    console.log(this.paintJson);
    this.http.post('http://120.78.137.182/element/Add-Paint', this.paintJson)
      .subscribe(data => {
      });
  }
  addF() {
    this.supid.push('');
    this.Alweight.push(0);
    this.As.push('');
  }
  addFp() {
    this.paint_weight.push(0);
    this.psupid.push('');
    this.Asp.push('');
  }
  addFd() {
    this.diluent_weight.push(0);
    this.supnum.push('');
    this.Asd.push('');
  }
}
export class Arr {
  supid: string;
  Alweight: number;
}
export class ALJson  {
  purchase: string;
  Alexweight: number;
  Altype: string;
  Alwidth: number;
  Althickness: number;
  Aldensity: string;
  Alprice: number;
  supname: string;
  wid: string;
  auditor: string;
  pro_system: string;
  arr: Array<Arr> = [];
}
export class PArr {
  paint_weight: number;
  supid: string;
}
export class DArr {
  diluent_weight: number;
  supnum: string;
}
export class PaintJson {
  purchase: string;
  pname: string;
  pdensity: number;
  pcondensate: number;
  ptype: string;
  pvolatile: number;
  price: number;
  paex_weight: number;
  supname: string;
  wid: string;
  auditor: string;
  dname: string;
  dtype: string;
  condensate: number;
  dvolatile: number;
  dprice: number;
  diex_weight: number;
  pro_system: string;
  arr1: Array<PArr> = [];
  arr2: Array<DArr> = [];
}
