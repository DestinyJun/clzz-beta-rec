import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MaterialHttpService} from '../../../remind/business/material-http.service';

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
  constructor( private http: MaterialHttpService) {
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
      console.log(body);
      this.http.findrawpage(body)
        .subscribe(data => {
          console.log(data);
          this.aluminums = data['values']['datas'];
          this.AOrders = data['values']['number'];
        });
    } else {
      const body = {
        page: this.printpage ,
        row: 10,
        mode:  mode
      };
      console.log(body);
      this.http.findrawpage(body)
        .subscribe(data => {
          console.log(data);
          this.prints = data['values']['datas'];
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
