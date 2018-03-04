import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-material-check',
  templateUrl: './material-check.component.html',
  styleUrls: ['./material-check.component.css']
})
export class MaterialCheckComponent implements OnInit {

  aluminumspage = 1;
  printpage = 1;
  aluminums = [];
  prints = [];
  AOrders: number;
  POrders: number;
  aphid = false;
  Hid = false;
  Aluminum: any;
  Paint: any;
  hid = false;
  constructor( private http: HttpClient) {
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
      const body = '{\n' +
        '\t"page":"' + this.aluminumspage + '",\n' +
        '\t"row":"5",\n' +
        '\t"mode":"' + mode + '"\n' +
        '}';
      console.log(body);
      this.http.post('http://120.78.137.182/element/findrawpage', body)
        .subscribe(data => {
          console.log(data);
          this.aluminums = data['values1'];
          this.AOrders = data['number'];
        });
    } else {
      const body = '{\n' +
        '\t"page":"' + this.printpage + '",\n' +
        '\t"row":"5",\n' +
        '\t"mode":"' + mode + '"\n' +
        '}';
      console.log(body);
      this.http.post('http://120.78.137.182/element/findrawpage', body)
        .subscribe(data => {
          console.log(data);
          this.prints = data['values2'];
          this.POrders = data['number'];
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

}
