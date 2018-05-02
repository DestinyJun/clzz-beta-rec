import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MaterialHttpService} from '../../../remind/business/material-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginIdService} from '../../../remind/login-id.service';

@Component({
  selector: 'app-material-check',
  templateUrl: './material-check.component.html',
  styleUrls: ['./material-check.component.css']
})
export class MaterialCheckComponent implements OnInit {

  aluminumspage = 1;
  printpage = 1;
  aluminums = [];
  paints = [];
  public hid = false;
  public AL: FormGroup;
  public paint: FormGroup;
  public supid: Array<string> = [];
  public Alweight: Array<number> = [];
  public psupid: Array<string> = [];
  public paint_weight: Array<number> = [];
  public supnum: Array<string> = [];
  public diluent_weight: Array<number> = [];
  AOrders: number;
  POrders: number;
  Aluminum: any;
  Paint: any;
  BHid = true;

  constructor( private http: MaterialHttpService, private fb: FormBuilder, private user: LoginIdService) {
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

  NoCheck() {
    if (!this.hid) {
      const body = {
        page: this.aluminumspage ,
        row: 10,
        mode: 0,
        status: 1
      };
      this.http.findrawpage(body).subscribe(data => {
        this.aluminums = data['values']['datas'];
        this.AOrders = data['values']['number'];
      });
    } else {
      const body = {
        page: this.printpage ,
        row: 10,
        mode: 1,
        status: 1
      };
      this.http.findrawpage(body).subscribe(data => {
        this.paints = data['values']['datas'];
        this.POrders = data['values']['number'];
      });
    }
  }
  HaveCheck() {
    if (!this.hid) {
      const body = {
        page: this.aluminumspage ,
        row: 10,
        mode: 0,
        status: 2
      };
      this.http.findrawpage(body).subscribe(data => {
        this.aluminums = data['values']['datas'];
        this.AOrders = data['values']['number'];
      });
    } else {
      const body = {
        page: this.printpage ,
        row: 10,
        mode: 1,
        status: 2
      };
      this.http.findrawpage(body).subscribe(data => {
        this.paints = data['values']['datas'];
        this.POrders = data['values']['number'];
      });
    }
  }
  DisCheck() {
    if (!this.hid) {
      const body = {
        page: this.aluminumspage ,
        row: 10,
        mode: 0,
        status: 4
      };
      this.http.findrawpage(body).subscribe(data => {
        this.aluminums = data['values']['datas'];
        this.AOrders = data['values']['number'];
      });
    } else {
      const body = {
        page: this.printpage ,
        row: 10,
        mode: 1,
        status: 4
      };
      this.http.findrawpage(body).subscribe(data => {
        this.paints = data['values']['datas'];
        this.POrders = data['values']['number'];
      });
    }
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
  RawDetail(AP, status) {
    if (status === 0) {
      this.Aluminum = AP;
    } else {
      this.Paint = AP;
    }
  }
  SeeOrders(mode) {
    if (mode === 0) {
      const body = {
        page: this.aluminumspage ,
        row: 10,
        mode:  mode
        };
      this.BHid = false;
      this.http.findrawpage(body)
        .subscribe(data => {
          console.log(data);
          this.aluminums = data['values']['datas'];
          this.AOrders = data['values']['number'];
        });
    } else {
      this.BHid = true;
      const body = {
        page: this.printpage ,
        row: 10,
        mode:  mode
      };
      this.http.findrawpage(body)
        .subscribe(data => {
          this.paints = data['values']['datas'];
          this.POrders = data['values']['number'];
        });
    }
  }
  NextAluminumPage() {
    if (this.AOrders > this.aluminumspage * 5) {
      this.aluminumspage++;
      this.SeeOrders(0);
    }
  }

  ProAluminumPage() {
    if (this.aluminumspage > 1) {
      this.aluminumspage--;
      this.SeeOrders(0);
    }
  }

  SkipAluminumPage(i: number) {
    if (i * 10 < this.AOrders && i > 0) {}
    this.SeeOrders(0);
  }
  NextPrintPage() {
    if (this.POrders > this.printpage * 5) {
      this.printpage++;
      this.SeeOrders(1);
    }
  }

  ProPrintPage() {
    if (this.printpage > 1) {
      this.printpage--;
      this.SeeOrders(1);
    }
  }

  SkipPrintPage(i: number) {
    if (i * 10 < this.POrders && i > 0) {}
    this.SeeOrders(1);
  }
  ngOnInit() {
    this.SeeOrders(0);
    this.SeeOrders(1);
  }
  pass(i) {
    if (i === 0) {
      this.http.updateal({purcase: this.AL.get('purchase').value, pro_auditor: this.user.get('userName'), status: 2})
        .subscribe(data => {
          if (data['status'] === '10') {
            window.confirm('已审核通过');
          } else {
            window.confirm('已审核未通过');
          }
          this.SeeOrders(0);
        });
    } else {
      this.http.allauditpa({purcase: this.Paint.get('purchase').value, pro_auditor: this.user.get('userName'), status: 2})
        .subscribe(data => {
          if (data['status'] === '10') {
            window.confirm('已审核通过');
          } else {
            window.confirm('已审核未通过');
          }
          this.SeeOrders(1);
        });
    }

  }

  Nopass(i) {
    if (i === 0) {
      this.http.updateal({purcase: this.AL.get('purchase').value, pro_auditor: this.user.get('userName'), status: 4})
        .subscribe(data => {
          if (data['status'] === '10') {
            window.confirm('已审核通过');
          } else {
            window.confirm('已审核未通过');
          }
          this.SeeOrders(0);
        });
    } else {
      this.http.allauditpa({purcase: this.Paint.get('purchase').value, pro_auditor: this.user.get('userName'), status: 4})
        .subscribe(data => {
          if (data['status'] === '10') {
            window.confirm('已审核通过');
          } else {
            window.confirm('已审核未通过');
          }
          this.SeeOrders(1);
        });
    }

  }

  public Used(i): string {
    if (i === 0) {
      return '未使用';
    } else if (i === 1) {
      return '已使用';
    }
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
}
