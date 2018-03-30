import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-order-craft',
  templateUrl: './order-craft.component.html',
  styleUrls: ['./order-craft.component.css']
})
export class OrderCraftComponent implements OnInit {

  page = 1;
  row = 10;
  orders = [];
  order = new Order();
  AllOrders: number;

  constructor(private http: HttpClient) {
    this.SeeOrders();
  }

  ngOnInit() {
    this.SeeOrders();
  }

  SeeOrders() {
    const body = '{\n' +
      '\t"page":"' + this.page + '",\n' +
      '\t"row":"' + this.row + '",\n' +
      '\t"status":"2"\n' +
      '}';
    this.http.post('http://120.78.137.182/element/See-Orders', body)
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
        this.AllOrders = data['number'];
      });
  }
  PageNumber() {
    const i = this.AllOrders % this.row;
    if (i === 0 && this.AllOrders > this.row) {
      return this.AllOrders / this.row;
    } else if ( i === 0) {
      return this.AllOrders / this. row;
    } else {
      return (this.AllOrders - i ) / this.row + 1;
    }
  }
  SkipPage(value) {
    if (this.AllOrders > value  * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    } else if (this.AllOrders > (value - 1) * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    }
  }
  NextPage() {
    if (this.AllOrders > this.page * 10) {
      this.page++;
      this.SeeOrders();
    }
  }

  ProPage() {
    if (this.page > 1) {
      this.page--;
      this.SeeOrders();
    }
  }
  ModalValue(value) {
    this.order = value;
    console.log(value);
  }
  pass(oid) {
    const body = '  {\n' +
      '"oid":"' + oid + '",\n' +
      '"pro_auditor":"阿福",\n' +
      '"fdry_film":"2.1",\n' +
      '"fwet_film":"4.7",\n' +
      '"pdry_film":"2.1",\n' +
      '"pwet_film":"4.7",\n' +
      '"bdry_film":"2.1",\n' +
      '"bwet_film":"4.7",\n' +
      '"status":"3",\n' +
      '"pro_system":"天际线"\n' +
      '}';
    console.log(body);
    this.http.post('http://120.78.137.182/element/Update-Orders', body)
      .subscribe(data => console.log(data));
  }
  Nopass(oid) {
    const body = '  {\n' +
      '"oid":"' + oid + '",\n' +
      '"pro_auditor":"阿福",\n' +
      '"fdry_film":"2.1",\n' +
      '"fwet_film":"4.7",\n' +
      '"pdry_film":"2.1",\n' +
      '"pwet_film":"4.7",\n' +
      '"bdry_film":"2.1",\n' +
      '"bwet_film":"4.7",\n' +
      '"status":"3",\n' +
      '"pro_system":"天际线"\n' +
      '}';
    console.log(body);
    this.http.post('http://120.78.137.182/element/Update-Orders', body)
      .subscribe(data => console.log(data));
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
