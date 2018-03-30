import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-order-query',
  templateUrl: './order-query.component.html',
  styleUrls: ['./order-query.component.css']
})
export class OrderQueryComponent implements OnInit {

  page = 1;
  orders = [];
  row = 10;
  order = new Order();
  AllOrders: number;
  read = true;
  public auditTitle: FormControl = new FormControl();

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.SeeOrders();
  }
  SeeOrders() {
    const body = '{\n' +
      '\t"page":"' + this.page + '",\n' +
      '\t"row":"' + this.row + '",\n' +
      '\t"status":"1"\n' +
      '}';
    this.http.post('http://120.78.137.182/element/See-Orders', body)
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
        this.AllOrders = data['number'];
      });
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
  SkipPage(value) {
    if (this.AllOrders > value  * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    } else if (this.AllOrders > (value - 1) * this.row && value > 0) {
      this.page = value;
      this.SeeOrders();
    }
  }
  DeleteOrder(oid) {
    if (window.confirm('确认删除吗？') ) {
      const body = '{"delete_id":"' + oid + '"}';
      this.http.post('http://120.78.137.182/element/Del-Orders', body)
        .subscribe(data => {
          this.SeeOrders();
        });
    }
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
  modal(value) {
    this.order = value;
    console.log(value);
  }
  remodal(): void {
    this.read = false;
  }
  ModifyOrder(oid) {
    const body = '{"delete_id":"' + oid + '"}';
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
  bccd: string;
  bchickness: string;
  bchicknessw: string;
  bprogram: string;
  btype: string;
  cname: string;
  contractname: string;
  doublecloat: string;
  exdelitime: string;
  exshiptime: string;
  fccd: string;
  figure: string;
  fprogram: string;
  fthickness: string;
  fthicknessw: string;
  ftype: string;
  oid: string;
  ostatus: string;
  pccd: string;
  price: string;
  pthickness: string;
  ptype: string;
  submitter: string;
  subtime: string;
  tel: string;
  country: string;
  province: string;
  city: string;
}
