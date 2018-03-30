import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public orderlist: Observable<any>;
  public orders: Array<any>;
  public order = new Order();
  constructor(private http: HttpClient) {
    const body = {
      'page': '1',
      'row': '5',
      'status': '0'
    };
    this.orderlist = this.http
      .post('http://120.78.137.182/element/See-Orders', body);
      this.orderlist.subscribe(data => {
        this.orders = data['values'];
      });
  }

  ngOnInit() {
  }
  modal(value): void {
    console.log(value);
    this.order = value;
  }

}
export class Order {
  address: string;
  allength: string;
  althickness: string;
  altype: string;
  amount: string;
  alwidth: string;
  audit: string;
  auditor: string;
  audittime: string;
  bccd: string;
  bchickness: string;
  bchicknessw: string;
  bdry_film: string;
  bprogram: string;
  btype: string;
  bwet_film: string;
  cname: string;
  contractname: string;
  deviation: string;
  doublecloat: string;
  exdelitime: string;
  exshiptime: string;
  fccd: string;
  fdry_film: string;
  figure: string;
  fprogram: string;
  fthickness: string;
  fthicknessw: string;
  ftype: string;
  fwet_film: string;
  oid: string;
  ostatus: string;
  pccd: string;
  pdry_film: string;
  pprogram: string;
  price: string;
  pthickness: string;
  pthicknessw: string;
  ptype: string;
  pwet_film: string;
  submitter: string;
  subtime: string;
  tel: string;
}
