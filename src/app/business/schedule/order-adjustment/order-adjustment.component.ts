import { Component, OnInit } from '@angular/core';
import {ScheduleHttpService} from '../../../remind/business/schedule-http.service';

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
  constructor(private http: ScheduleHttpService) {
    this.SeeOrders();
  }
  up(j) {
    this.http.OrderMobileFunction({
      oidone: this.orders[j]['oid'] ,
      oidtwo: this.orders[j - 1]['oid'],
      priorityone: this.orders[j]['priority'],
      prioritytwo: this.orders[j - 1]['priority']
    })
      .subscribe(data => {
        this.SeeOrders();
      });
  }
  down(j) {
    this.http.OrderMobileFunction({
      oidone: this.orders[j]['oid'] ,
      oidtwo: this.orders[j + 1]['oid'],
      priorityone: this.orders[j]['priority'],
      prioritytwo: this.orders[j + 1]['priority']
    })
      .subscribe(data => {
        this.SeeOrders();
      });
  }
  SeeOrders() {
    this.http.OrderAudited()
      .subscribe(data => {
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
