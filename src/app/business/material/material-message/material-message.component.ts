import { Component, OnInit } from '@angular/core';
import {InfoStatusService} from '../../../remind/info-status.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialHttpService} from '../../../remind/business/material-http.service';

@Component({
  selector: 'app-material-message',
  templateUrl: './material-message.component.html',
  styleUrls: ['./material-message.component.css']
})
export class MaterialMessageComponent implements OnInit {


  public hid = false;
  public AL: FormGroup;
  public paint: FormGroup;
  public supid: Array<string> = [];
  public Alweight: Array<number> = [];
  public psupid: Array<string> = [];
  public paint_weight: Array<number> = [];
  public supnum: Array<string> = [];
  public diluent_weight: Array<number> = [];
  public aluminums = [];
  public paints = [];
  private row = 10;
  constructor(private http: MaterialHttpService, private MaterialStatus: InfoStatusService, private fb: FormBuilder) {
    console.log(this.MaterialStatus);

    this.AL = this.fb.group({
      purchase: ['', [Validators.required]],
      alex_weight: ['', [Validators.required]],
      al_type: ['', [Validators.required]],
      al_width: ['', [Validators.required]],
      al_thickness: ['', [Validators.required]],
      al_density: ['', [Validators.required]],
      al_price: ['', [Validators.required]],
      status: [''],
      creator: [''],
      idt: [''],
      pro_auditor: [''],
      upt: [''],
      supplier: ['', [Validators.required]],
      w_id: ['', [Validators.required]],
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
    setTimeout(() => {
      if (!this.MaterialStatus.get('mode')) {
        this.MaterialStatus.setNumber('Al-page', 1);
        this.MaterialStatus.setNumber('Paint-page', 1);
        this.MaterialStatus.set('mode', '0');
      }
      this.SeeMaterial();
    }, 100);
  }

  PageNumber(i: string): Number {
    if (this.MaterialStatus.getNumber(i) < this.row) {
      return 1;
    } else if (this.MaterialStatus.getNumber(i) % this.row === 0) {
      return this.MaterialStatus.getNumber(i) / this.row;
    } else {
      return (this.MaterialStatus.getNumber(i) - this.MaterialStatus.getNumber(i) % this.row) / this.row + 1;
    }
  }
  ToggleAl() {
    this.MaterialStatus.set('mode', '0');
    this.SeeMaterial();
  }
  TogglePaint() {
    this.MaterialStatus.set('mode', '1');
    this.SeeMaterial();
  }
  public Status(i): string {
    if (i === 0) {
      return '未提交';
    } else if (i === 1) {
      return '已提交未审核';
    } else if (i === 2) {
      return '审核通过';
    } else if (i === 3) {
      return '已出库';
    } else if (i === 4) {
      return '审核未通过';
    }
    return '无法识别';
  }
  public Used(i): string {
    if (i === 0) {
      return '未使用';
    } else if (i === 1) {
      return '已使用';
    }
  }
  SeeMaterial() {
    console.log(this.MaterialStatus.get('mode'));
    let body;
    if (this.MaterialStatus.get('mode') === '0') {
      body = {
        'page': this.MaterialStatus.get('Al-page'),
        'row': this.row,
        'mode': this.MaterialStatus.getNumber('mode')
      };
      this.http.findrawpage(body)
        .subscribe(data => {
          console.log(data);
          this.aluminums = data['values']['datas'];
          console.log(this.aluminums);
          this.MaterialStatus.set('Al-number', data['values']['num']);
        });
    } else {
      body = {
        'page': this.MaterialStatus.get('Paint-page'),
        'row': this.row,
        'mode': this.MaterialStatus.getNumber('mode')
      };
      this.http.findrawpage(body)
        .subscribe(data => {
          this.paints = data['values']['datas'];
          this.MaterialStatus.set('Paint-number', data['values']['number']);
        });
    }

  }
  NextPage() {
    let number, page;
    if (this.MaterialStatus.get('mode') === '0') {
      page = this.MaterialStatus.getNumber('Al-page');
      number = this.MaterialStatus.getNumber('Al-number');
      if (number >= page * this.row) {
        this.MaterialStatus.set('page', page + 1);
        console.log(this.MaterialStatus);
        this.SeeMaterial();
      }
    } else {
      page = this.MaterialStatus.getNumber('Paint-page');
      number = this.MaterialStatus.getNumber('Paint-number');
      if (number >= page * this.row) {
        this.MaterialStatus.set('page', page + 1);
        this.SeeMaterial();
      }
    }

  }

  FrontPage() {
    let number, page;
    if (this.MaterialStatus.get('mode') === '0') {
      page = this.MaterialStatus.getNumber('Al-page');
      number = this.MaterialStatus.getNumber('Al-number');
      if (this.MaterialStatus.getNumber('Al-page') > 1) {
        this.MaterialStatus.setNumber('page', page - 1);
        this.SeeMaterial();
      }
    } else {
      page = this.MaterialStatus.getNumber('Paint-page');
      number = this.MaterialStatus.getNumber('Paint-number');
      if (this.MaterialStatus.getNumber('Paint-page') > 1) {
        this.MaterialStatus.setNumber('page', page - 1);
        this.SeeMaterial();
      }
    }

  }
  MessageAl(purchase: string): void {
    const body = {
      'purchase': purchase
    };
    this.http.SeeAluminum(body)
      .subscribe(data => {
        console.log(data['data'][0]);
        this.AL.patchValue(data['data'][0]);
        this.AL.patchValue({'amount': Number(this.AL.get('al_price')) * Number(this.AL.get('alex_weight'))});
        const s: Array<string> = [];
        const A: Array<number> = [];
        const arr = data['data'][0]['arr'];
        for (let i = 0; i < arr.length; i++) {
          s.push(arr[i]['al_weight']);
          A.push(arr[i]['supplier_number']);
        }
        this.supid = s;
        this.Alweight = A;
      });
  }
  MessagePaint(purchase: string): void {
    const body = {
      'purchase': purchase
    };
    this.http.SeePaint(body)
      .subscribe(data => {
        const ps: Array<string> = [];
        const pw: Array<number> = [];
        for (let i = 0; i < data['data1'][0]['arr1'].length; i++) {
          ps.push(data['data1'][0]['arr1'][i]['supid']);
          pw.push(data['data1'][0]['arr1'][i]['paint_weight']);
        }
        const su: Array<string> = [];
        const di: Array<number> = [];
        for (let i = 0; i < data['data2'][0]['arr2'].length; i++) {
          su.push(data['data2'][0]['arr2'][i]['supnumber']);
          di.push(data['data2'][0]['arr2'][i]['diluentweight']);
        }
        this.psupid = ps;
        this.paint_weight = pw;
        this.supnum = su;
        this.diluent_weight = di;
        this.paint.patchValue(data['data1'][0]);
        this.paint.patchValue(data['data2'][0]);
      });
  }
}
