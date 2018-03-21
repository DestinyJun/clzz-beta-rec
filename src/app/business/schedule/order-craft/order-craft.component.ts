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
  AllOrders: number;

  constructor(private http: HttpClient) {
    this.http.post('http://120.78.137.182/element/See-Orders', '')
      .subscribe(data => {
        console.log(data);
        this.orders = data['values'];
      });
  }

  ngOnInit() {
    this.SeeOrders();
  }

  SeeOrders() {
    const body = '{\n' +
      '\t"page":"' + this.page + '",\n' +
      '\t"row":"' + this.row + '",\n' +
      '\t"status":"3"\n' +
      '}';
    console.log(body);
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
    if (this.AllOrders > value  * this.row) {
      this.page = value;
      this.SeeOrders();
    } else if (this.AllOrders > (value - 1) * this.row) {
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

}
