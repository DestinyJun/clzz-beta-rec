import {Component, HostBinding, OnInit} from '@angular/core';
import {InfoStatusService} from '../../../remind/info-status.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterialHttpService} from '../../../remind/business/material-http.service';
import {slideToRight} from '../../../remind/ts/routeAnimation';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginIdService} from '../../../remind/login-id.service';

@Component({
  selector: 'app-material-message',
  templateUrl: './material-message.component.html',
  styleUrls: ['./material-message.component.css'],
  animations: [slideToRight]
})
export class MaterialMessageComponent implements OnInit {
  @HostBinding('@routerAnimate') state;

  public hid = false;
  public AL: FormGroup;
  public paint: FormGroup;
  public aluminumspage: number;
  public paintpage: number;
  public mode: string;
  public selectId: number;
  public supid: Array<string> = [];
  public Alweight: Array<number> = [];
  public psupid: Array<string> = [];
  public paint_weight: Array<number> = [];
  public supnum: Array<string> = [];
  public diluent_weight: Array<number> = [];
  public aluminums = [];
  public paints = [];
  public aluminumsNumber: number;
  public paintsNumber: number;
  private row = 10;
  constructor(private router: Router, private http: MaterialHttpService,
              private fb: FormBuilder, private route: ActivatedRoute, private user: LoginIdService) {
    this.route.params.subscribe(params => this.SeeMaterial());
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
  }
  public Status(i): string {
    if (i === 1) {
      return '未审核';
    }
  }
  public Used(i): string {
    if (i === 0) {
      return '未使用';
    } else if (i === 1) {
      return '已使用';
    }
  }
  SeeMaterial() {
    this.paintpage = this.route.snapshot.params['paintpage'];
    this.mode = this.route.snapshot.params['mode'];
    this.aluminumspage = this.route.snapshot.params['ALpage'];
    this.selectId = this.route.snapshot.params['selectId'];
    this.hid = this.mode === '1';
    if (this.mode === '0') {
      const body = {
        page: this.aluminumspage,
        row: 10,
        mode: 0,
        status: 1
      };
      console.log(body);
      this.http.findrawpage(body).subscribe(data => {
        this.aluminums = data['values']['datas'];
        this.aluminumsNumber = data['values']['number'];
      });
    } else {
      const body = {
        page: this.paintpage ,
        row: 10,
        mode: 1,
        status: 1
      };
      this.http.findrawpage(body).subscribe(data => {
        this.paints = data['values']['datas'];
        this.paintsNumber = data['values']['number'];
      });
    }
  }

  NextAluminumPage() {
    if (this.aluminumsNumber > this.aluminumspage * 10) {
      this.aluminumspage++;
      this.router.navigate(['/home/material/matmes', this.mode, this.aluminumspage, this.paintpage, this.selectId]);
    }
  }
  ProAluminumPage() {
    if (this.aluminumspage > 1) {
      this.aluminumspage--;
      this.router.navigate(['/home/material/matmes', this.mode, this.aluminumspage, this.paintpage, this.selectId]);
    }
  }

  SkipAluminumPage(i: number) {
    if (i * 10 < this.aluminumsNumber && i > 0) {}
    this.router.navigate(['/home/material/matmes', this.mode, this.aluminumspage, this.paintpage, this.selectId]);
  }
  NextPrintPage() {
    if (this.aluminumsNumber > this.paintpage * 10) {
      this.paintpage++;
      this.router.navigate(['/home/material/matmes', this.mode, this.aluminumspage, this.paintpage, this.selectId]);
    }
  }

  ProPrintPage() {
    if (this.paintpage > 1) {
      this.paintpage--;
      this.router.navigate(['/home/material/matmes', this.mode, this.aluminumspage, this.paintpage, this.selectId]);
    }
  }

  SkipPrintPage(i: number) {
    if (i * 10 < this.paintsNumber && i > 0) {
      this.router.navigate(['/home/material/matmes', this.mode, this.aluminumspage, this.paintpage, this.selectId]);
    }
  }
  MessageAl(purchase: string): void {
    const body = {
      purchase: purchase
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
      purchase: purchase
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
  pass(i) {
    if (i === 0) {
      this.http.updateal({purcase: this.AL.get('purchase').value, pro_auditor: this.user.get('userName'), status: 2})
        .subscribe(data => {
          console.log(data);
          this.SeeMaterial();
        });
    } else {
      this.http.allauditpa({purcase: this.paint.get('purchase').value, pro_auditor: this.user.get('userName'), status: 2})
        .subscribe(data => {
          console.log(data);
          this.SeeMaterial();
        });
    }

  }

  Nopass(i) {
    if (i === 0) {
      this.http.updateal({purcase: this.AL.get('purchase').value, pro_auditor: this.user.get('userName'), status: 4})
        .subscribe(data => {
          console.log(data);
          this.SeeMaterial();
        });
    } else {
      this.http.allauditpa({purcase: this.paint.get('purchase').value, pro_auditor: this.user.get('userName'), status: 4})
        .subscribe(data => {
          console.log(data);
          this.SeeMaterial();
        });
    }

  }
}
