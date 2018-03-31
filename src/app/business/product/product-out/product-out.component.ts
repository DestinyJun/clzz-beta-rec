import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-out',
  templateUrl: './product-out.component.html',
  styleUrls: ['./product-out.component.css']
})
export class ProductOutComponent implements OnInit {

  orders: Order[] = [];
  constructor(private http: HttpClient) {
    this.http.post('http://120.78.137.182/element-plc/finished/find-warehouse-out-record', '')
      .subscribe(data => {
        this.orders = data['values'];
        console.log(data);
      });
  }
  ngOnInit() {
  }
}
export class Order {

  constructor(
    public  oid: string,
    public  totalnum: string,
    public  idt: string,
    public  status: string,
  ) {}
}
