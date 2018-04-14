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
  oid = new Oid();
  constructor(private http: HttpClient) {
    this.SeeOrders();
  }
  up(j) {
    this.oid = {oidone: this.orders[j]['oid'], oidtwo: this.orders[j - 1]['oid']};
    const body = {
      'OidOne': + this.orders[j]['oid'] ,
      'OidTwo': + this.orders[j - 1]['oid']
      };
    console.log(body);
    this.http.post('http://120.78.137.182/element-plc/order/mobile-function', this.oid)
      .subscribe(data => {
        this.SeeOrders();
      });
  }
  down(j) {
    const body = {
      'OidOne': this.orders[j]['oid'],
      'OidTwo': this.orders[j + 1]['oid']
    };
    this.http.post('http://120.78.137.182/element-plc/order/mobile-function', body)
      .subscribe(data => this.SeeOrders());
  }
  SeeOrders() {
    const body = {
      'page': this.page ,
      'row': this.row ,
      'status': 1
      };
    this.http.post('http://120.78.137.182/element-plc/order/audited', body)
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];

        for (let i = 0; i < this.orders.length; i++) {
          for ( let j = i + 1; j < this.orders.length; j++) {
            if (this.orders[j].priority < this.orders[i].priority) {
              const od = this.orders[j];
              this.orders[j] = this.orders[i];
              this.orders[i] = od;
            }
          }
        }
        console.log(this.orders);
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
export class Oid {
  oidone: string;
  oidtwo: string;
}
