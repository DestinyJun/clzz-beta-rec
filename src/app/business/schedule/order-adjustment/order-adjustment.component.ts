import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-order-adjustment',
  templateUrl: './order-adjustment.component.html',
  styleUrls: ['./order-adjustment.component.css']
})
export class OrderAdjustmentComponent implements OnInit {
  page = 1;
  orders = [];
  row = 10;
  AllOrders: number;
  constructor(private http: HttpClient) {
    this.SeeOrders();
  }
  up(j) {
    const body = '{\n' +
      '\t"oidone":"' + this.orders[j]['oid'] + '",\n' +
      '\t"oidtwo":"' + this.orders[j - 1]['oid'] + '"\n' +
      '}';
    console.log(this.orders[j]['oid']);
    console.log(this.orders[j - 1]['oid']);
    this.http.post('http://120.78.137.182/element-plc/order/shift-up', body)
      .subscribe(data => {
        this.SeeOrders();
      });
  }
  down(j) {
    const body = '{\n' +
      '\t"oidone":"' + this.orders[j]['oid'] + '",\n' +
      '\t"oidtwo":"' + this.orders[j + 1]['oid'] + '"\n' +
      '}';
    this.http.post('http://120.78.137.182/element-plc/order/shift-down', body)
      .subscribe(data => this.SeeOrders());
  }
  SeeOrders() {
    const body = '{\n' +
      '\t"page":"' + this.page + '",\n' +
      '\t"row":"' + this.row + '",\n' +
      '\t"status":"1"\n' +
      '}';
    this.http.post('http://120.78.137.182/element-plc/order/audited', body)
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
        this.AllOrders = data['values'].length;
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

  ngOnInit() {}
}
