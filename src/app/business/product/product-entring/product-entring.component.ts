import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-product-entring',
  templateUrl: './product-entring.component.html',
  styleUrls: ['./product-entring.component.css']
})
export class ProductEntringComponent implements OnInit {

  orders: Order[] = [];
  constructor(private http: HttpClient) {
    this.http.post('http://120.78.137.182/element-plc/finished/find-produce-information', '')
      .subscribe(data => {
        this.orders = data['values'];
        console.log(data);
      });
  }
  ngOnInit() {
  }
  Status(i): string {
    if (i === 0) {
      return '未入库';
    } else if (i === 1) {
      return '正在入库';
    } else if (i === 2) {
      return '已全部入库';
    } else if (i === 4) {
      return '已全出库';
    }
  }
}
export class Order {

  constructor(
    public  oid: string,
    public  numofware: string,
    public  idt: string,
    public  status: string,
  ) {}
}
