import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';

@Component({
  selector: 'app-material-entry',
  templateUrl: './material-entry.component.html',
  styleUrls: ['./material-entry.component.css']
})
export class MaterialEntryComponent implements OnInit {

  hid = false;
  modalhid = false;
  aluminumspage = 1;
  printpage = 1;
  row = 5;
  aluminums = [];
  prints = [];
  AllOrders: number;
  AOrders: number;
  POrders: number;
  AL: FormGroup;
  paint: FormGroup;
  supid: Array<string> = [];
  Alweight: Array<string> = [];
  psupid: Array<string> = [];
  paint_weight: Array<string> = [];
  supnum: Array<string> = [];
  diluent_weight: Array<string> = [];
  As: Array<string> = [];
  Asd: Array<string> = [];
  Asp: Array<string> = [];
  constructor(private http: HttpClient, private fb: FormBuilder) {

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
    })
  }

  ngOnInit() {
    this.SeeOrders(0);
    this.SeeOrders(1);
  }

  addF() {
    this.supid.push('');
    this.Alweight.push('');
    this.As.push('');
  }
  addFp() {
    this.paint_weight.push('');
    this.psupid.push('');
    this.Asp.push('');
  }
  addFd() {
    this.diluent_weight.push('');
    this.supnum.push('');
    this.Asd.push('');
  }
  SeeOrders(mode) {
    if (mode === 0) {
      const body = '{\n' +
        '\t"page":"' + this.aluminumspage + '",\n' +
        '\t"row":"' + this.row + '",\n' +
        '\t"mode":"' + mode + '"\n' +
        '}';
      this.http.post('http://120.78.137.182/element/findrawpage', body)
        .subscribe(data => {
          this.aluminums = data['values1'];
          this.AOrders = data['number'];
        });
    } else {
      const body = '{\n' +
        '\t"page":"' + this.printpage + '",\n' +
        '\t"row":"' + this.row + '",\n' +
        '\t"mode":"' + mode + '"\n' +
        '}';
      this.http.post('http://120.78.137.182/element/findrawpage', body)
        .subscribe(data => {
          this.prints = data['values2'];
          this.POrders = data['number'];
        });
    }
  }
  SeeOrdersStatus(mode, status) {
    if (mode === 0) {
      const body = '{\n' +
        '\t"page":"' + this.aluminumspage + '",\n' +
        '\t"row":"5",\n' +
        '\t"status":"' + status + '",\n' +
        '\t"mode":"' + mode + '"\n' +
        '}';
      this.http.post('http://120.78.137.182/element/findrawpage', body)
        .subscribe(data => {
          this.aluminums = data['values1'];
          this.AOrders = data['number'];
        });
    } else {
      const body = '{\n' +
        '\t"page":"' + this.printpage + '",\n' +
        '\t"row":"5",\n' +
        '\t"status":"' + status + '",\n' +
        '\t"mode":"' + mode + '"\n' +
        '}';
      this.http.post('http://120.78.137.182/element/findrawpage', body)
        .subscribe(data => {
          this.prints = data['values2'];
          this.POrders = data['number'];
        });
    }
  }
  NextAluminumPage() {
    if (this.AllOrders > this.aluminumspage * 10) {
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
    if (i * 5 < this.AllOrders && i > 0) {}
    this.SeeOrders(0);
  }
  NextPrintPage() {
    if (this.AllOrders > this.printpage * 10) {
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
    if (i * 5 < this.AllOrders && i > 0) {}
    this.SeeOrders(1);
  }
}
export class Aluminum {
  type = '铝卷';
  purchase: string;
  pro_system: string;
  altype: string;
  alweight: number;
  alwidth: number;
}
export class Print {
  type = '油漆';
  ptype: string;
  price: string;
  pname: string;
  purchase: number;
  paint_weight: number;
}
