import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

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
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.SeeOrders(0);
    this.SeeOrders(1);
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
