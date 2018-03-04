import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-order-craft',
  templateUrl: './order-craft.component.html',
  styleUrls: ['./order-craft.component.css']
})
export class OrderCraftComponent implements OnInit {

  page = 1;
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
      '\t"row":"10",\n' +
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
