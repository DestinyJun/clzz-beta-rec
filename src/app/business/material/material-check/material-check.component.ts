import {Component, HostBinding, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MaterialHttpService} from '../material-http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginIdService} from '../../../login/login-id.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {slideToRight} from '../../../routeAnimation';

@Component({
  selector: 'app-material-check',
  templateUrl: './material-check.component.html',
  styleUrls: ['./material-check.component.css'],
  animations: [slideToRight]
})
export class MaterialCheckComponent implements OnInit {
  @HostBinding('@routerAnimate') state;
  public aluminumspage = 1;
  public paintpage = 1;
  public aluminums = [];
  public paints = [];
  public mode;
  public hid = false;
  public AL: FormGroup;
  public paint: FormGroup;
  public supid: Array<string> = [];
  public Alweight: Array<number> = [];
  public psupid: Array<string> = [];
  public paint_weight: Array<number> = [];
  public supnum: Array<string> = [];
  public diluent_weight: Array<number> = [];
  public AOrders: number;
  public POrders: number;
  public Aluminum: any;
  public Paint: any;
  public status: string;

  constructor(private router: Router, private route: ActivatedRoute,
              private http: MaterialHttpService, private fb: FormBuilder,
              ) {
    this.route.params.subscribe(params => {console.log('1'); this.Check(); });
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

  Check() {
    this.paintpage = this.route.snapshot.params['paintpage'];
    this.mode = this.route.snapshot.params['mode'];
    this.aluminumspage = this.route.snapshot.params['ALpage'];
    this.status = this.route.snapshot.params['status'];
    this.hid = this.mode === '1';

    if (this.mode === '0') {
      let body;
      if (this.status === '0') {
        body = {
          page: this.aluminumspage,
          row: 10,
          mode: 0
        };
      } else {
        body = {
          page: this.aluminumspage,
          row: 10,
          mode: 0,
          status: this.status
        };
      }
      console.log(body);
      this.http.findrawpage(body).subscribe(data => {
        this.aluminums = data['values']['datas'];
        this.AOrders = data['values']['number'];
      });
    } else {
      let body;
      if (this.status === '0') {
        body = {
          page: this.paintpage ,
          row: 10,
          mode: 1
        };
      } else {
        body = {
          page: this.paintpage ,
          row: 10,
          mode: 1,
          status: this.status
        };
      }
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
    if (status === '0') {
      this.Aluminum = AP;
    } else {
      this.Paint = AP;
    }
  }
  NextAluminumPage() {
    if (this.AOrders > this.aluminumspage * 10) {
      this.aluminumspage++;
      this.router.navigate(['/home/material/matche', this.status, this.mode, this.aluminumspage, this.paintpage]);
    }
  }

  ProAluminumPage() {
    if (this.aluminumspage > 1) {
      this.aluminumspage--;
      this.router.navigate(['/home/material/matche', this.status, this.mode, this.aluminumspage, this.paintpage]);
    }
  }

  SkipAluminumPage(i: number) {
    if (i * 10 < this.AOrders && i > 0) {}
    this.router.navigate(['/home/material/matche', this.status, this.mode, this.aluminumspage, this.paintpage]);
  }
  NextPrintPage() {
    if (this.POrders > this.paintpage * 10) {
      this.paintpage++;
      this.router.navigate(['/home/material/matche', this.status, this.mode, this.aluminumspage, this.paintpage]);
    }
  }

  ProPrintPage() {
    if (this.paintpage > 1) {
      this.paintpage--;
      this.router.navigate(['/home/material/matche', this.status, this.mode, this.aluminumspage, this.paintpage]);
    }
  }

  SkipPrintPage(i: number) {
    if (i * 10 < this.POrders && i > 0) {
      this.router.navigate(['/home/material/matche', this.status, this.mode, this.aluminumspage, this.paintpage]);
    }
  }
  ngOnInit() {
    this.Check();
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
      return '未审核';
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
